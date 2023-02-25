const express = require('express')
const router = express.Router()

const {userSign,userLogin,welcome} = require('../controller/user')

router.route('/user').get(userSign)
router.route('/login').get(userLogin)
router.route('/welcome').get(welcome)



module.exports = router