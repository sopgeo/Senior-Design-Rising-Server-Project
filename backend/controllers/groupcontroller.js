const db = require("../models/")
const Group = db.groups
const User = db.users

exports.getGroups = async (req, res) => {
    try {
        let groups = req.body.section_id
        if (groups && groups !== '') groups = await Group.findAll({
            order: [["title"]],
            where: {
                section_id: req.body.section_id
            },
            include: [
                {
                    model: User,
                    
                }
            ]
                
            
        })
        else groups = await Group.findAll()
        
        res.status(200).json(groups);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message, message: "Error occurred getting groups"});
    }
}

exports.getGroupById = async (req, res) => {
    try {
        let group = await Group.findOne({
            where: { 
                group_id: req.body.group_id
            }
        })
        res.status(200).json(group)
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred getting groups"})
    }
}

exports.createGroup = async (req, res) => {
    try {
        const newGroup = await Group.create({
            project_id: null,
            hidden: 0,
            submitted: 0,
            section_id: req.body.section_id,
            title: req.body.title
          })
          
          const response = {
            ...newGroup.toJSON(),
            users: []
            }

          res.status(200).json(response)
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred creating group"})
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        const result = await Group.destroy({
            where: {
                group_id: req.body.group_id
            }
        })

        if (result > 0) {
            res.status(200).json({ message: `Group deleted`})
          } else {
            res.status(200).json({ message: `No group found with group_id${req.body.group_id}`});
          }
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred deleting group"})
    }
}
