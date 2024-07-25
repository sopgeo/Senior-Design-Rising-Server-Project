const express = require('express')
const projectController = require('../controllers/projectcontroller')

const router = express.Router()

const requireAuth = require('../auth')

router.get('/getProjects', projectController.getProjects)

router.get('/getProject', projectController.getProject)

router.post('/getProjectMembers', projectController.getMembers)

router.post('/createProject', requireAuth, projectController.createProject)

router.post('/searchProjects', projectController.projectSearch)

router.post('/deleteProject', requireAuth, projectController.deleteProject)

module.exports = router