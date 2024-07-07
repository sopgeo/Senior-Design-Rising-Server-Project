const express = require('express')
const userController = require('../controllers/usercontroller')

const router = express.Router()

router.post('/createUser', userController.createUser)

router.post('/loginUser', userController.login)

router.post('/deleteUser', userController.deleteUser)

router.post('/resetpassword', userController.resetPassword)

module.exports = router