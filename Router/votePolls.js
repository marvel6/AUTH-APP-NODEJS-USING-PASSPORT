const express = require('express')
const router = express.Router()

const { authenticateUser, checkPermission } = require('../middleware/userauthentication')

const { addCandidateCredentials, getCandidates, addVotes, deleteCandidates, updatedCandidateInfo } = require('../controller/createCandidate')


router.route('/polls').post(authenticateUser, checkPermission("admin"), addCandidateCredentials)
router.route('/polls').get(authenticateUser, getCandidates)

router.route('/polls/vote').post(authenticateUser, addVotes)
router.route('/polls/deleteCanditate/:id').delete(authenticateUser, checkPermission("admin"), deleteCandidates)
router.route('/polls/updateCandidate/:id').patch(authenticateUser, checkPermission("admin"), updatedCandidateInfo)


module.exports = router

