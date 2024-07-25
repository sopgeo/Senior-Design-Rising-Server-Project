const express = require('express')
const fileController = require('../controllers/filecontroller')

const router = express.Router()

const requireAuth = require('../auth')

router.post('/upload', requireAuth, fileController.uploadFile)

router.post('/deleteFile', requireAuth, fileController.deleteFile)

module.exports = router