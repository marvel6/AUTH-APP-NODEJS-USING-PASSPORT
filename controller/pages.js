
const googleUser = require('../model/google')

module.exports = {
    getWelcomePage : async(req,res) => {
        res.render("welcome")
    },
    dashboard : async(req,res) => {

       res.render("dashboard",)


       
    }
}