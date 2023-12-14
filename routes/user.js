const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const WrapAsync = require("../error/WrapAsync.js");
const passport = require("passport");
const pathlocate = require("../middleware/path.js");
const Listing = require("../models/Listing.js");

router.get("/signup", (req, res) => {
  res.render("render/signup.ejs");
});

//search items
router.get(
  "/search",
  WrapAsync(async (req, res) => {
    let searchText = req.query.searchText;
    if(searchText) {
      let results = await Listing.find({$text : {$search : searchText}})
      res.render('render/index.ejs' , {results , isSearch : true , searchText});
    } else {
      res.redirect('/#allbox');
    }
  }));

// category icons search
router.get(
  '/category' ,
  WrapAsync (async (req , res) => {
   let searchQuery = req.query.category;
   const searchText = req.query.searchText || ''

   if(searchQuery) {
     let results = await Listing.find({category : searchQuery})
     res.render('render/index.ejs', { results, isSearch: true , searchText })
     res.redirect('/#allbox')
   } else {
    res.redirect('/#allbox')
   }
   
}));

//home page
router.get(
  "/",
  WrapAsync(async (req, res) => {
    let list = await Listing.find();
    res.render("render/index.ejs", { list , isSearch : false });
  })
);

router.post(
  "/signup",
  WrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let user = new User({ username, email });
      let newuser = await User.register(user, password);
      req.login(newuser, function (err) {
        if (err) {
          return next(err);
        }
        req.flash("success", "User Signed in 😍");
        res.redirect("/");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You are logout");
      res.redirect("/");
    }
  });
});

router.get("/login", (req, res) => {
  res.render("render/login.ejs");
});

router.post(
  "/login",
  pathlocate,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "You are Loggedin 👍");
    let path = res.locals.currurl || "/";
    res.redirect(`${path}`);
  }
);



module.exports = router;
