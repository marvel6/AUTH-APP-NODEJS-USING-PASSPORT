

module.exports = {
    userSign: async(req,res) => {
       res.send('Register')
    },

    userLogin : async(req,res) => {
        res.send('login')
    },
    welcome: async(req,res) => {
        res.render('welcome')
    }
}