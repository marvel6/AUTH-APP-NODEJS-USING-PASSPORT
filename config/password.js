const localStrtegy = require('passport-local').Strategy
const User = require('../model/user')


module.exports = async (passport) => {
    passport.use(
        new localStrtegy({ usernameField: 'email' }, async (email, password, done) => {
            await User.findOne({ email: email })
                .then(async user => {
                    if (!user) {
                        return done(null, false, { message: 'This email is registered' })
                    }

                    const comparedPassword = await User.comparePassword(password)

                    if (comparedPassword) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'password incorrect' })
                    }
                }).catch(err => console.log(err))
        })
    )


    passport.serializeUser((user, done) => {

        done(null, user.id)
    })

    passport.deserializeUser((id, user) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}