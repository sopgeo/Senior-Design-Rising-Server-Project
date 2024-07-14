const db = require("../models/")
const Section = db.sections
const Group = db.groups
const User = db.users

exports.createSection = async (req, res) => {
    try {
        const newSection = await Section.create({
            title: req.body.title
          })
      
          res.status(200).send(newSection)
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred creating section"})
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const result = await Section.destroy({
            where: {
                section_id: req.body.section_id
            }
        })

        if (result > 0) {
            res.status(200).json({ message: `Section deleted`})
          } else {
            res.status(200).json({ message: `No section found with section_id${req.body.section_id}`});
          }
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred deleting section"})
    }
}

exports.getSections = async (req, res) => {
    try {
        const sections = await Section.findAll({
            order: [["section_id", "DESC"]],
            include: [
                {
                    model: Group,
                    include: User
                }
            ]
        })
        res.status(200).json(sections)
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred getting sections"})
    }
}