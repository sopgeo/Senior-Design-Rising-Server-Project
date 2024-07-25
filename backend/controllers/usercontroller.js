const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const db = require("../models/")
const bcrypt = require('bcrypt')

const User = db.users
const jwt = require('jsonwebtoken')

const createToken = (ucf_id, type) => {
    const payload = {
        ucf_id: ucf_id,
        type: type
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '3d' })
}

exports.createUser = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        const preexisting = await User.findOne({
            where: {ucf_id: req.body.ucf_id}
        })

        if (preexisting) throw Error(`User with ucf_id already exists (user_id ${preexisting.user_id})`)

        const newUser = await User.create({
            ucf_id: req.body.ucf_id,
            password: hash,
            type: req.body.type,
            group_id: req.body.group_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            photo: "",
            section: req.body.section
        })

        res.status(200).json(newUser)
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred creating user"})
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {ucf_id: req.body.ucf_id}
        })
        
        if (!user) {
            throw Error("Incorrect UCF ID or password")
        }

        
        if (user.password == undefined){
            throw Error("Stored password is null")
        }
        
        const match = await bcrypt.compare(req.body.password, user.password)
        
        if (!match) {
            throw Error("Incorrect UCF ID or password")
        }

        if (await bcrypt.compare((user.ucf_id).toString(), user.password)) user.dataValues.defaultPassword = 1 
        else user.dataValues.defaultPassword = 0

        const token = createToken(user.ucf_id, user.type)
        
        res.status(200).json({user, token})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({error: error.message, message: "Error logging in user"})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.destroy({
            where: {
                ucf_id: req.body.ucf_id
            }
        })

        if (result > 0) {
            res.send({ message: `User deleted`})
          } else {
            res.send({ message: `No user found with user_id`});
          }
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred deleting user"})
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({where: {ucf_id: req.body.ucf_id}})

        if (!user) {
            throw Error("No user found");
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        user.password = hash
        await user.save()

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred resetting password"})
    }
}

exports.checkUserExists = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { ucf_id: req.body.ucf_id }
        });

        if (user) {
            res.status(200).json({ exists: true, user_id: user.user_id });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error occurred checking user" });
    }
}