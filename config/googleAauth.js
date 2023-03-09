const googleStrategy = require('passport-google-oauth20').Strategy
const googleUser = require('../model/google')
const User = require('../model/user')

module.exports = async (passport) => {

    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'

    }, async(accessToken, refreshToken,profile,done) => {
        
        const newUser = {
            cloudId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            image:profile[0].value

        }
    }))



}