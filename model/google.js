const mongoose = require('mongoose')


const googleSchema = new mongoose.Schema({
    cloudId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: false
    }


})



module.exports = mongoose.model('googleData', googleSchema)




