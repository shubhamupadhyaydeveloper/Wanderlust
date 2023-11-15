const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const Listing = require("./models/Listing.js");
const methodOverride = require("method-override");
const ejsengine = require("ejs-mate");
const morgan = require("morgan");
const WrapAsync = require("./error/WrapAsync.js");
const ExpressError = require("./error/ExpressError.js");
const validatejoi = require("./schema.js");
const { func } = require("joi");

async function calldb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("You are successfully connected to mongodb");
  } catch (error) {
    console.log(error.message);
  }
}
calldb();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsengine);

function checkvalidation(req ,res, next) {
    let joi = validatejoi.validate(req.body);
    if(joi.error){ 
        throw new ExpressError(400 , joi.error)
    } else {
        next()
    }
}

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.listen(port, () => {
  console.log("Your app is listning on port 3000");
});

app.get("/", (req, res) => {
  res.send("<h1>Hi and Welcome to my Website 👋</h1>");
});

app.get(
  "/list",
  WrapAsync(async (req, res) => {
    let list = await Listing.find();
    res.render("render/index.ejs", { list });
  })
);

app.get("/list/new", (req, res) => {
  res.render("render/new.ejs");
});

//create
app.post(
  "/list", checkvalidation ,
  WrapAsync(async ( req, res, next) => {
    let newlist = new Listing(req.body.list);
    await newlist.save();
    res.redirect("/list");
  })
);

app.get(
  "/list/:id",
  WrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("render/show.ejs", { list });
  })
);

app.get(
  "/list/:id/edit",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    res.render("render/edit.ejs", { list });
  })
);

//update
app.put(
  "/list/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findByIdAndUpdate(id, { ...req.body.list });
    res.redirect(`/list/${id}`);
  })
);

//delete
app.delete(
  "/list/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/list");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, `Page not found`));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = `Something went wrong` } = err;
  res.status(statusCode).render("render/error.ejs", { err });
});
