const customError = require('../errors')
const candidate = require('../model/votingProcess')
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

    const addCandidate = await candidate.create(newcandidate);

    res.status(StatusCodes.CREATED).json(response({ msg: `${addCandidate.candidateName} has been added successfully`, data: addCandidate }))
}


const getCandidates = async (req, res) => {

    let votes = await candidate.find({})

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

    let voter = await candidate.findOne({ candidateName: req.body.add });

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

}


const updatedCandidateInfo = async (req, res) => {

    const user = await candidate.findById(req.params.id);

    if (!user) {
        throw new customError.BadRequestError('You cannot update a candiate that is not found')
    }

    const updateCandidate = await candidate.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    })

    res.status(StatusCodes.OK).json(response({ msg: `Candidate ${updateCandidate.name} information have been updated successfully` }))
}



const deleteCandidates = async (req, res) => {

    const votercandidate = await candidate.findById(req.params.id)

    if (!votercandidate) {
        throw new customError.BadRequestError('You cannot delete a user that is not present')
    }

    await votercandidate.remove()

    res.status(StatusCodes.OK).json(response({ msg: 'Canditate have been deletede successfully' }))

}



module.exports = {
    addCandidateCredentials,
    updatedCandidateInfo,
    deleteCandidates,
    getCandidates,
    addVotes
}




