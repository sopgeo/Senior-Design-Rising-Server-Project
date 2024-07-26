const express = require('express')
const tagController = require('../controllers/tagcontroller')

const router = express.Router()

const adminAuth = require('../auth/adminAuth')

router.post('/createTag', adminAuth, tagController.createTag)

router.post('/deleteTag', adminAuth, tagController.deleteTag)

router.get('/tags', tagController.getAllTags);

router.post('/assignTag', tagController.assignTag)

router.post('/unassignTag', tagController.unassignTag)

module.exports = router