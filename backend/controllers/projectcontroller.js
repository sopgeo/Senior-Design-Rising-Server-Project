const db = require("../models/")

const Project = db.projects

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
          order: [["name", "ASC"]]
        });
      
      
        res.status(200).send(projects);
      } catch (error) {
        console.log(error);
        res.status(500).send({error: error, message: "Error occurred getting projects"});
      }
}