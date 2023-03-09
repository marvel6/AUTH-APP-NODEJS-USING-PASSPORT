const express = require('express')
const router = express.Router()

const { login, register, submitLogin, submitRegister, logout } = require('../controller/user')

router.route('/login').get(login)
router.route('/register').get(register)
router.route('/login').post(submitLogin)
router.route('/register').post(submitRegister)
router.route('/logout').get(logout)

module.exports = router
