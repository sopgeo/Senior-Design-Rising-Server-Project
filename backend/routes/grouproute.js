const express = require('express')
const groupController = require('../controllers/groupcontroller')
const router = express.Router()

router.post('/getGroups', groupController.getGroups)

router.post('/getGroupById', groupController.getGroupById)

router.post('/createGroup', groupController.createGroup)

router.post('deleteGroup', groupController.deleteGroup)

module.exports = router