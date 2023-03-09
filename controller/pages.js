<<<<<<< HEAD

const googleUser = require('../model/google')

=======
>>>>>>> 4ba3946148c7581ce6776853fbf70e81a8b88ded
module.exports = {
    getWelcomePage : async(req, res) => {
        res.render("welcome")
    },
<<<<<<< HEAD
    dashboard : async(req,res) => {

       res.render("dashboard",)


       
=======
    dashboard : async(req, res) => {
       res.render("dashboard", {name:req.user.username})
>>>>>>> 4ba3946148c7581ce6776853fbf70e81a8b88ded
    }
}
