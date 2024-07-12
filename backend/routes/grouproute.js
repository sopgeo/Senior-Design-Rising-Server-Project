const express = require('express')
const groupController = require('../controllers/groupcontroller')
const router = express.Router()

router.post('/getGroups', groupController.getGroups)

module.exports = router