const User = require('../model/user')
const passport = require('passport')

module.exports = {
    login: async(req, res) => {
        res.render("login")
    },
    register: async(req, res) => {
        res.render("register")
    },
    submitLogin: async(req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/api/v1/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    },
    submitRegister: async(req, res) => {
        const { name, email, password, password2 } = req.body
        let errors = [];

        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please provide values for missing fields' })
        }

        if (password !== password2) {
            errors.push({ msg: 'Password mismatch please provide valid result' })
        }

        if (password.length < 6) {
            errors.push({ msg: 'password must not be less than 6 characters' })
        }

        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            errors.push({ msg: 'User already exist, please register with another email' })
            res.render('register', { errors, name, email, password })
        }

        const newUser = {
            username: name,
            email,
            password
        }

        await User.create(newUser)

        req.flash('success_msg', 'You are now registered , lets begin talking')

        res.render('login')
    },

    logout : (req,res) => {
        req.logOut((err)=> {
            if(err) return next(err);
        })
        res.redirect('/users/login')
    }
}
