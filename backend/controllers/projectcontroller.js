const db = require("../models/")

const Project = db.projects
const Files = db.files

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
          order: [["name", "ASC"]]
        });
      
        res.setHeader('Content-Type', 'application/json')

        var files = await Files.findAll({
        });
    
        projects.map(project => {
          if (project.documents) {
            let tempFilesLocation = files.filter(file => project.project_id === file.project_id);
            project['documents'] = tempFilesLocation;
          } else {
            project['documents'] = [];
          }
          return project;
        })
        
        res.status(200).json(projects);
      } catch (error) {
        console.log(error);
        res.status(500).json({error: error, message: "Error occurred getting projects"});
      }
}

exports.createProject = async (req, res) => {
  try {
    const newProject = Project.create({
      group_id: req.body.group_id,
      name: req.body.name,
      sponsor: req.body.sponsor,
      sponsor_contact: req.body.sponsor_contact,
      description: req.body.description,
      end_semester: req.body.end_semester,
      end_year: req.body.end_year,
      documents: 0
    })

    res.send({ message: 'Project created'})
  }
  catch (error) {
    res.status(500).json({error: error, message: "Error occurred creating project"})
  }
}