const express = require('express')
const tagController = require('../controllers/tagcontroller')

const router = express.Router()

router.post('/createTag', tagController.createTag)

router.post('/deleteTag', tagController.deleteTag)

router.get('/tags', tagController.getAllTags);

router.post('/assignTag', tagController.assignTag)

router.post('/unassignTag', tagController.unassignTag)

module.exports = router