const express = require('express')
const projectController = require('../controllers/projectcontroller')

const router = express.Router()

router.get('/getProjects', projectController.getProjects)

router.get('/getProject', projectController.getProject)

router.post('/getProjectMembers', projectController.getMembers)

router.post('/createProject', projectController.createProject)

router.post('/searchProjects', projectController.projectSearch)

router.post('/deleteProject', projectController.deleteProject)

module.exports = router