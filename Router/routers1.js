const express = require('express')
const router = express.Router()

const {getWelcomePage} = require('../controller/pages')

router.route('/').get(getWelcomePage)


module.exports = router