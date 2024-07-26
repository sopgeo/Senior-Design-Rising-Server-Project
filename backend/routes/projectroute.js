const express = require('express')
const projectController = require('../controllers/projectcontroller')

const router = express.Router()

const studentAuth = require('../auth/studentAuth')
const adminAuth = require('../auth/adminAuth')

router.get('/getProjects', projectController.getProjects)

router.get('/getProject', projectController.getProject)

router.post('/getProjectMembers', projectController.getMembers)

router.post('/createProject', studentAuth, projectController.createProject)

router.post('/searchProjects', projectController.projectSearch)

router.post('/deleteProject', adminAuth, projectController.deleteProject)

module.exports = router