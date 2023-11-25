const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const methodOverride = require("method-override");
const ejsengine = require("ejs-mate");
const morgan = require("morgan");
const ExpressError = require("./error/ExpressError.js");
const listingrouter = require('./routes/listing.js')
const reviewrouter = require('./routes/review.js')
const userrouter = require('./routes/user.js')
const session = require('express-session')
const flash = require('connect-flash')
const User = require('./models/User.js')
const passport = require('passport')
const passportlocal = require('passport-local')

async function calldb() {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    console.log('You connected to mongoose')
  } catch (error) {
    console.log(error)
  }
}
calldb()

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsengine);
app.use(session({
  secret : 'mysupersecret',
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true
  }
}))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())

app.use((req , res ,next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.curruser = req.user;
  console.log('Current User:', req.user);
  next()
}) 
   

passport.use(new passportlocal(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
  
app.listen(port, () => {
  console.log("Your app is listning on port 4000");
});

app.get("/", (req, res) => {
  res.send("<h1>Hi and Welcome to my Website 👋</h1>");
});

app.use('/list' , listingrouter);
app.use('/list/:id/review' , reviewrouter);
app.use('/' , userrouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, `Page not found`));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = `Something went wrong` } = err;
  res.status(statusCode).render("render/error.ejs", { err });
});
 