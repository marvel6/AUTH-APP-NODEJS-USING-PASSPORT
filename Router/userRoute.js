const express = require('express')
const router = express.Router()

const {userSign,userLogin,welcome,register} = require('../controller/user')

router.route('/register').get(userSign)
router.route('/login').get(userLogin)
router.route('/').get(welcome)


router.route('/register').post(register)



module.exports = router