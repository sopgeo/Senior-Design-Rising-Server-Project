const express = require('express')
const fileController = require('../controllers/filecontroller')

const router = express.Router()

router.post('/upload', fileController.uploadFile)

module.exports = router