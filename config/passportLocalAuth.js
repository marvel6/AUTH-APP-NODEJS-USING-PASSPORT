const localStrategy = require('passport-local').Strategy
const User = require('../model/user')
const bcrypt = require('bcryptjs')


module.exports = async (passport) => {

    passport.use(

        new localStrategy({ usernameField: 'email' }, async (email, password, done) => {

            await User.findOne({ email: email })

                .then(user => {

                    if (!user) {
                        return done(null, false, { message: 'This email is not registered' })
                    }

                    bcrypt.compare(password,user.password,(err,isMatch)=> {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user)
                        }else{
                            return done(null,false,{message:'Incorrect password'})
                        }
                    })

                })
        })

    );


    passport.serializeUser((user, done) => {

        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}