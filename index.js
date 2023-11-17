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
const { Listschema , Reviewschema } = require("./schema.js");
const Review = require('./models/Review.js');

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

function checkvalidation(req ,res, next) {
    let joi = Listschema.validate(req.body);
    if(joi.error){ 
        throw new ExpressError(400 , joi.error)
    } else {
        next()
    }
}

function checkreview(req ,res, next) {
  let joi = Reviewschema.validate(req.body);
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

//show result
app.get(
  "/list/:id",
  WrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate('review');
    res.render("render/show.ejs", { list });
  })
);

//edit page only
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

// reviewpost
app.post('/list/:id/review' , checkreview
 ,WrapAsync( async (req , res) => {
  let {id} = req.params;
   let listing = await Listing.findById(req.params.id)
   let review = new Review(req.body.review)

   listing.review.push(review)

   await listing.save()
   await review.save()

   res.redirect(`/list/${id}`)
}))
 
// reviewdelete 
app.delete('/list/:id/review/:reviewid', WrapAsync( async (req ,res) => {
    let {id , reviewid} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {review : reviewid}})
    
    await Review.findByIdAndDelete(reviewid)
    res.redirect(`/list/${id}`)

}))

app.all("*", (req, res, next) => {
  next(new ExpressError(404, `Page not found`));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = `Something went wrong` } = err;
  res.status(statusCode).render("render/error.ejs", { err });
});
