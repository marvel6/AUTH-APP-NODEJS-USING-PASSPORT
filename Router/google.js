const express = require('express')
const router = express.Router()
const passport = require('passport')

router.route('/google').get(passport.authenticate('google', { scope: ['profile','email'] }));

router.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/api/v1/', successRedirect: '/api/v1/dashboarrd' }))




module.exports = router