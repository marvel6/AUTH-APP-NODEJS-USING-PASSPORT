const customError = require('../errors')
const canditate = require('../model/votingProcess')
const { StatusCodes } = require('http-status-codes')
const response = require('../response/response')



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
            label: vote.candidateName,
            percentage: (((100 * vote.voteCount) / totalVotes) || 0).toFixed(0)
        }
    })

    res.status(StatusCodes.OK).json(response({ data: voteResults }))


}


const addVotes = async(req,res) => {

}



module.exports = {
    addCandidateCredentials,
    getCandidates,
    addVotes
}




