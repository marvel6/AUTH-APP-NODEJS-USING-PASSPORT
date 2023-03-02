module.exports = {
    ensureAuth : (req,res,next) => {
        if(req.isAuthenticated){
            return next()
        }
        req.flash('error_msg','you are not authorised to access this route, please login')
        res.redirect('/users/login')
    }
}