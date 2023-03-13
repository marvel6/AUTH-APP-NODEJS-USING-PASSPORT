const express = require('express')
const router = express.Router()


const {getWelcomePage} = require('../controller/user')



router.route('/').get(getWelcomePage)




module.exports = router
