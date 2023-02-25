const express = require('express')
const router = express.Router()

const {userSign,userLogin} = require('../controller/user')

router.route('/user').get(userSign)
router.route('/login').get(userLogin)



module.exports = router