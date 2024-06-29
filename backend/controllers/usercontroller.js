const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const db = require("../models/")
const bcrypt = require('bcrypt')

const User = db.users

exports.createUser = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        const preexisting = await User.findOne({
            where: {ucf_id: req.body.ucf_id}
        })

        if (preexisting) throw Error(`User with ucf_id already exists (user_id ${preexisting.user_id})`)

        const newUser = User.create({
            ucf_id: req.body.ucf_id,
            password: hash,
            type: req.body.type,
            group_id: req.body.group_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            photo: "",
            section: req.body.section
        })

        res.status(200).json({ message: `User ${req.body.first_name} ${req.body.last_name} created`})
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
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        
        // console.log("req.body.password: " + req.body.password)
        // console.log("user.password " + user.password)
        // console.log("hash: " + hash)
        
        const match = await bcrypt.compare(req.body.password, hash)
        // console.log(match)

        if (!match) {
            console.log(match)
            throw Error("Incorrect UCF ID or password")
        }
        
        res.status(200).json(user)
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
                user_id: req.body.user_id
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