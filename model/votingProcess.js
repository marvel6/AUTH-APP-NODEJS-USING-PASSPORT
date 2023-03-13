const mongoose = require('mongoose')


const voters = new mongoose.Schema({
    electionType: {
        name: String,
    },
    candidateName: {
        type: String,
        required: [true, 'please provide canditates name'],
        min: 6,
        maxlength: 50
    },

    partyName: {
        type: String,
        required: [true, 'please provide party name'],
        mon: 6,
        maxlenght: 50

    },

    description: String,

    voteCount:{
        type:Number,
        default:0
    }

})


module.exports = mongoose.model('Votes',voters)