const express = require('express')
const router = express.Router()


const {authenticateUser} = require('../middleware/userauthentication');
const {updateUser,updatePassword} = require('../controller/user-setting')


router.route('/emailSettings').post(authenticateUser,updateUser)
router.route('/passwordSetting').post(authenticateUser,updatePassword)


module.exports = router
