const express = require('express')
const router = express.Router()
const passport = require('passport')

router.route('/google').get(passport.authenticate('google', { scope: ['profile'] }));

router.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/api/v1/', successRedirect: '/api/v1/dashboarrd' }))




module.exports = router