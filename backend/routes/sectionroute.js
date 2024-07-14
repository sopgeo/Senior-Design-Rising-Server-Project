const express = require('express')
const sectionController = require('../controllers/sectioncontroller')
const router = express.Router()

router.post('/createSection', sectionController.createSection)

router.post('/deleteSection', sectionController.deleteSection)

router.get('/getSections', sectionController.getSections)

module.exports = router