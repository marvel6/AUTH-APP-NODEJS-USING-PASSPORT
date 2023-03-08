const googleStrategy = require('passport-google-oauth20').Strategy
const userGoolge = require('../model/google')
const User = require('../model/user')

module.exports = async (passport) => {
    passport.use(new googleStrategy({
        // clientID:process.env.GOOGLE_CLIENT_ID,
        // clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL:'/auth/google/callback'

    }),async(acessToken,refresToken,profile,done) => {
        
    })




}

