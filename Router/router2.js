const express = require('express')
const router = express.Router()

const {login,register,submitLogin,submitRegister} = require('../controller/user')

router.route('/login').get(login)
router.route('/register').get(register)


router.route('/login').post(submitLogin)
router.route('/register').post(submitRegister)


module.exports = router