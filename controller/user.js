

module.exports = {
    userSign: async(req,res) => {
       res.render('register')
    },

    userLogin : async(req,res) => {
        res.render('login')
    },
    welcome: async(req,res) => {
        res.render('welcome')
    },
    register: async(req,res) => {
        const {name,email,password,password2} = req.body

        let error = []


        if(!name || !email || !password || !password2){
            error.push({msg:"please provide all field"})
        }

        if(password !== password2){
            error.push({msg:"please provide matching password"})
        }


        if(password && password2 < 6){
            error.push({msg:"password cannot be less than 6 characters"})
        }

        if(error.length > 0){
            res.render('register',{
                error,
                name,
                email,
                password,
                password2,
            })
        }
    }
}