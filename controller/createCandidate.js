const customError = require('../errors')
const canditate = require('../model/votingProcess')
const { StatusCodes } = require('http-status-codes')
const response = require('../response/response')
const User = require('../model/userSchema')



const addCandidateCredentials = async (req, res) => {
    const { type, name, partyname, description } = req.body

    const newcandidate = {
        electionType: type,
        candidateName: name,
        partyName: partyname,
        description
    }

    const addCandidate = await canditate.create(newcandidate);

    res.status(StatusCodes.CREATED).json(response({ msg: `${addCandidate.candidateName} has been added successfully`, data: addCandidate }))
}


const getCandidates = async (req, res) => {

    let votes = await canditate.find({})

    const totalVotes = votes.reduce((accumulator, candidate) => accumulator + candidate.voteCount, 0);

    const voteResults = votes.map(vote => {
        return {
            id: vote._id,
            label: vote.candidateName,
            percentage: (((100 * vote.voteCount) / totalVotes) || 0).toFixed(0)
        }
    })

    res.status(StatusCodes.OK).json(response({ data: voteResults }))


}



const addVotes = async (req, res) => {

    let voter = await canditate.findOne({ candidateName: req.body.add });

    const user = await User.findOne({ _id: req.user.userId })

    if (!voter) {
        throw new customError.BadRequestError('Candidate not evaluated please go to safety')
    }



    if (user.hasVoted === false) {

        voter.voteCount += 1

        voter.save();

        user.hasVoted = true
        user.save()

        return res.status(StatusCodes.OK).json(response({ msg: ' congratulations You have casted you vote' }))

    } else if (user.hasVoted === true) {

        return res.status(StatusCodes.OK).json(response({ msg: `Oops, ${user.name} have voted already` }))
    }



    res.json('votes added successfully')


}



module.exports = {
    addCandidateCredentials,
    getCandidates,
    addVotes
}




