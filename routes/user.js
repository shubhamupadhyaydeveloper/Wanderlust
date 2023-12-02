const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const WrapAsync = require("../error/WrapAsync.js");
const passport = require("passport");
const pathlocate = require('../middleware/path.js')

router.get("/signup", (req, res) => {
  res.render("render/signup.ejs");
});

router.post(
  "/signup",
  WrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let user = new User({ username, email });
      let newuser = await User.register(user, password);
      req.login(newuser, function(err) {
        if (err) { return next(err); }
        req.flash("success", "User Signed in 😍");
        res.redirect("/list");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

router.get('/logout' , (req , res ,next) => {
    req.logout((err) => {
      if(err) {
        return next(err)
      } else {
        req.flash('success' , "You are logout")
        res.redirect('/list')
      }
    })
})

router.get("/login", (req, res) => {
  res.render("render/login.ejs");
});

router.post("/login",
 pathlocate,
 passport.authenticate("local" , {
   failureRedirect : '/login',
   failureFlash : true
 })
,
 async (req, res) => {
   req.flash('success' , 'You are Loggedin 👍')
   let path = res.locals.currurl || '/list'
   res.redirect(`${path}`)
 });



module.exports = router;
