const db = require("../models/")
const Group = db.groups
const User = db.users

exports.getGroups = async (req, res) => {
    try {
        let groups
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
