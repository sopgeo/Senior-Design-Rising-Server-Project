const db = require("../models/")
const Group = db.groups
const User = db.users

exports.getGroups = async (req, res) => {
    try {
        let groups = req.body.semester
        if (groups && groups !== '') groups = await Group.findAll({
            order: [["title"]],
            where: {
                semester: req.body.semester
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
