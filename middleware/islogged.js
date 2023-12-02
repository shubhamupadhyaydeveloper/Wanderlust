const passport = require('passport')

const login = (req , res,next) => {
    if(!req.isAuthenticated()) {
        req.session.url = req.originalUrl;
        req.flash('error', 'please login First')
        res.redirect('/login')
      }
      next()
}

module.exports = login;