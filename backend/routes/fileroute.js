const express = require('express')
const fileController = require('../controllers/filecontroller')

const router = express.Router()

const studentAuth = require('../auth/studentAuth')
const adminAuth = require('../auth/adminAuth')

router.post('/upload', studentAuth, fileController.uploadFile)

router.post('/deleteFile', adminAuth, fileController.deleteFile)

module.exports = router