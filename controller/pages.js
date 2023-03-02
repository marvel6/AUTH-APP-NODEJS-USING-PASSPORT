
module.exports = {
    getWelcomePage : async(req,res) => {
        res.render("welcome")
    },
    dashboard : async(req,res) => {

       res.render("dashboard",{
        name:req.user.username
       })
    }
}