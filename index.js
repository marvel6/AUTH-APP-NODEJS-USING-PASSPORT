require('dotenv')
require('express-async-error')

const express = require('express')
const app = express()

const expressLayout = require('express-ejs-layouts')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')




const port = process.env.PORT || 8080

const connectDb = require('./db/connect')
const router1 = require('./Router/routers1')
const router2 = require('./Router/router2')


app.use(expressLayout)
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')


app.use(cors())
app.use(helmet())


if(process.env.NODE_ENV === 'development'){

    app.use(morgan())
}


//routes

app.use('/api/v1',router1)
app.use('/users',router2)


const start = async() =>{

     await connectDb("mongodb://0.0.0.0:27017/AUTH_NODE")

    app.listen(port,() => console.log(`App listening on port ${port}`))
}


start()