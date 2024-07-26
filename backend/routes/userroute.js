const express = require('express')
const userController = require('../controllers/usercontroller')

const router = express.Router()

const adminAuth = require('../auth/adminAuth')

router.post('/createUser', adminAuth, userController.createUser)

router.post('/loginUser', userController.login)

router.post('/deleteUser', adminAuth, userController.deleteUser)

router.post('/resetPassword', userController.resetPassword)

router.post('/checkUserExists', userController.checkUserExists)

module.exports = router