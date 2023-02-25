require('dotenv')
require('express-async-error')


const express = require('express')

const app = express()

const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const express_layout = require('express-ejs-layouts')

const port = process.env.PORT || 8080


//EJS
app.use(express_layout)
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false }))


const connectDb = require('./connectDB/connect')
const routes = require('./Router/userRoute')




app.use(cors())
app.use(helmet())


if(process.env.NODE_ENV === "development"){
   app.use(morgan('dev'))
}





app.use('/users',routes)



const start = async() => {

    await connectDb("mongodb://0.0.0.0:27017/AUTH_PASSPORT")

    app.listen(port,() => console.log(`App is listening on port ${port}`))
}




start()