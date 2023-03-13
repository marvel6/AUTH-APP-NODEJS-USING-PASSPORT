const express = require('express')
const router = express.Router()

const { authenticateUser, checkPermission } = require('../middleware/userauthentication')

const { addCandidateCredentials,getCandidates } = require('../controller/createCandidate')


router.route('/polls').post(authenticateUser, checkPermission("admin"), addCandidateCredentials)
router.route('/polls').get(authenticateUser, getCandidates)


module.exports = router

getCandidates