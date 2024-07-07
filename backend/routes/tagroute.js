const express = require('express')
const tagController = require('../controllers/tagcontroller')

const router = express.Router()

router.post('/createTag', tagController.createTag)

router.post('/deleteTag', tagController.deleteTag)

router.get('/tags', tagController.getAllTags);

module.exports = router