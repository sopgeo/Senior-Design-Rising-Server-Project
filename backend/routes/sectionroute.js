const express = require('express')
const sectionController = require('../controllers/sectioncontroller')
const router = express.Router()

const adminAuth = require('../auth/adminAuth')

router.post('/createSection', adminAuth, sectionController.createSection)

router.post('/deleteSection', adminAuth, sectionController.deleteSection)

router.get('/getSections', sectionController.getSections)

router.post('/checkSectionExists', sectionController.checkSectionExists)

router.post('/changeSubmissionStatus', adminAuth, sectionController.changeSubmissionStatus)

module.exports = router