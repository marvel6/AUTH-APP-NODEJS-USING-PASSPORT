
module.exports = {
    login: (req,res) => {

        res.render("login")

    },

    register: (req,res) => {
      res.render("register")
    },

    submitLogin :(req,res) => {
       console.log(req.body)

       res.send('hello')
    },

    submitRegister : (req,res) => {
    
        const {name,email,password,password2} = req.body
        
        let errors = [];

        if(!name || !email || !password || !password2){

            errors.push({msg:'Please provide values for missing fields'})

        }


        if(password !== password2){
            errors.push({msg:'Password mismatch please provide valid result'})
        }


        if(password.length < 6){
            errors.push({msg:'password must not be less than 6 characters'})
        }

        if(errors.length > 0){
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            })
        }else{

            res.send('hello')

        }

       

    }
}