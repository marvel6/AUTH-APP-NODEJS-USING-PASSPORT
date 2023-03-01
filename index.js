require('dotenv')
require('express-async-error')

const express = require('express')
const app = express()

const expressLayout = require('express-ejs-layouts')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')



const port = process.env.PORT || 8080

const connectDb = require('./db/connect')
const router1 = require('./Router/routers1')
const router2 = require('./Router/router2')
require('./config/password')(passport)



app.use(expressLayout)
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')


app.use(cors())
app.use(helmet())


app.use(session({
    secret: 'B?E(H+MbQeThWmZq4t7w!z%C&F)J@NcR',
    saveUninitialized: true,
    resave: true
}))


app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg')

    res.locals.error_msg = req.flash('error_msg')
    
    next()
})


if (process.env.NODE_ENV === 'development') {

    app.use(morgan())
}


//routes

app.use('/api/v1', router1)
app.use('/users', router2)


const start = async () => {

    await connectDb("mongodb://0.0.0.0:27017/AUTH_NODE")

    app.listen(port, () => console.log(`App listening on port ${port}`))
}


start()