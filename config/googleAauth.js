const googleStrategy = require('passport-google-oauth20').Strategy
const googleUser = require('../model/google')


module.exports = async (passport) => {

    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'

    }, async (acessToken, refreshToken, profile, done) => {
        const newUser = {
            cloudId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile[0].value,
            email: profile.emails[0].value

        };

        try {

            const checkUser = await googleUser.findOne({ cloudId: profile.id })


            if (checkUser) {
                done(null, checkUser)
            } else {

                const user = await googleUser.create(newUser)

                done(null, user)
            }



        } catch (error) {
            console.log(error.message)
        }


    }))


 passport.serializeUser((user,done) => {

    done(null,user.id)
 })

 passport.deserializeUser((id,done) => {
    googleUser.findById(id,(err,user) => done(err,user))
 })

}