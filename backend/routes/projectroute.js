const express = require('express')
const projectController = require('../controllers/projectcontroller')

const router = express.Router()

router.get('/', projectController.getProjects)

router.post('/createProject', projectController.createProject)

module.exports = router