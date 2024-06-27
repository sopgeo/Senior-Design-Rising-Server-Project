const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const db = require("../models/")

const Project = db.projects
const Files = db.files
const User = db.users
const Group = db.groups
const Tags = db.tags

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
        res.status(500).json({error: error.message, message: "Error occurred getting projects"});
      }
}

exports.getProject = async (req, res) => {
  try {
      const project_id = req.query.project_id
      const project = await Project.findOne({
        where: { project_id: project_id},
        include: [
          {
            model: Group,
            include: User
          },
          {
            
            model: Tags,
            through: {
              attributes: []
            },
          },
        ]
      })
    
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.setHeader('Content-Type', 'application/json');

      // Fetch related files
      var files = await Files.findAll({ where: { project_id: project_id } });

      // Attach documents to the project if any
      project['documents'] = files.length > 0 ? files : [];

      
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message, message: "Error occurred getting project"});
    }
}

exports.getMembers = async (req, res) => {
  try {
    const project_id = req.body.project_id
      const group = await Group.findOne({
        where: { project_id: project_id},
      });

      if (!group) {
        throw Error("Group not found")
      }

      const group_id = group.group_id
      const members = await User.findAll({
        where: {
          group_id: group_id
        }
      })

    res.status(200).json(members)

  } catch (error) {
    console.log(error);
      res.status(500).json({error: error.message, message: "Error occurred getting project members"});
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
    res.status(500).json({error: error.message, message: "Error occurred creating project"})
  }
}

exports.projectSearch = async (req, res) => {
  try {
    // validate body and filters
    const queryString = req.body.query || '';
    const yearFilter = req.body.year || '';
    const semesterFilter = req.body.semester || '';
    const tagFilter = req.body.tags || []

    const projects = await Project.findAll({
      order: [["end_year", "DESC"]],
      where: {
        [Op.or]: [
          {
            name: {
              [Op.substring]: queryString
            }
          },
          {
            sponsor: {
              [Op.substring]: queryString
            }
          },
          {
            description: {
              [Op.substring]: queryString
            }
          },
          {
            '$tags.name$': { [Op.substring]: queryString }
          },
          Sequelize.where(Sequelize.fn("concat", Sequelize.col('group.users.first_name'), ' ', Sequelize.col('group.users.last_name')), { [Op.substring]: queryString })
        ],
        end_semester: {
          [Op.substring]: semesterFilter
        },
        end_year: {
          [Op.substring]: yearFilter
        },
        '$tags.name$': {
          [Op.in]: tagFilter
        }
      },
      include: [
        {
          model: Group,
          include: User
        },
        {
          model: Tags,
          through: {
            attributes: []
          },
        },
      ]

    });

    res.status(200).send(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occurred while attempting to search projects.",
    });
  }
}