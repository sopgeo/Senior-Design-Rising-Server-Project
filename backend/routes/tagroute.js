const express = require('express')
const tagController = require('../controllers/tagcontroller')

const router = express.Router()

router.post('/createTag', tagController.createTag)

router.post('/deleteTag', tagController.deleteTag)

module.exports = router