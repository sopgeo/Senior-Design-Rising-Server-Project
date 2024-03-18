const db = require("../models/")

const Project = db.projects

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
          order: [["name", "ASC"]]
        });
      
        res.setHeader('Content-Type', 'application/json')
        
        res.status(200).json(projects);
      } catch (error) {
        console.log(error);
        res.status(500).json({error: error, message: "Error occurred getting projects"});
      }
}