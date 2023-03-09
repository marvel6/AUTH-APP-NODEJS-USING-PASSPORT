const express = require('express')
const router = express.Router()

const { getWelcomePage, dashboard } = require('../controller/pages')
const { ensureAuth } = require('../config/auth')

router.route('/').get(getWelcomePage)
router.route('/dashboard').get(ensureAuth, dashboard)

module.exports = router