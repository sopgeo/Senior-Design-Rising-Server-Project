const express = require('express')
const groupController = require('../controllers/groupcontroller')
const router = express.Router()

const adminAuth = require('../auth/adminAuth')

router.post('/getGroups', groupController.getGroups)

router.post('/getGroupById', groupController.getGroupById)

router.post('/createGroup', adminAuth, groupController.createGroup)

router.post('/deleteGroup', adminAuth, groupController.deleteGroup)

router.post('/checkGroupExists', groupController.checkGroupExists); 

module.exports = router