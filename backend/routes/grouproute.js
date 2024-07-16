const express = require('express')
const groupController = require('../controllers/groupcontroller')
const router = express.Router()

router.post('/getGroups', groupController.getGroups)

router.post('/getGroupById', groupController.getGroupById)

router.post('/createGroup', groupController.createGroup)

router.post('/deleteGroup', groupController.deleteGroup)

router.post('/checkGroupExists', groupController.checkGroupExists); 

module.exports = router