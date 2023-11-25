const express = require("express");
const router = express.Router({mergeParams : true});
const WrapAsync = require("../error/WrapAsync.js");
const ExpressError = require("../error/ExpressError.js");
const Listing = require("../models/Listing.js");
const { Listschema  } = require("../schema.js");
const islogin = require('../middleware/islogged.js')

function checkvalidation(req ,res, next) {
    let joi = Listschema.validate(req.body);
    if(joi.error){ 
        throw new ExpressError(400 , joi.error)
    } else {
        next()
    }
}

//home page
router.get(
  "/",
  WrapAsync(async (req, res) => {
    let list = await Listing.find();
    res.render("render/index.ejs", { list });
  })
);


//new page
router.get("/new", islogin, (req, res) => {
  res.render("render/new.ejs");
});
 
//create
router.post(
  "/", islogin,
  checkvalidation,
  WrapAsync(async (req, res, next) => {
    let newlist = new Listing(req.body.list);
    req.flash('success' , 'New Listing Register 😍')
    await newlist.save();
    res.redirect("/list");
  })
);

//show result
router.get(
  "/:id",islogin,
  WrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate("review");
    if(!list){
      req.flash('error','Sorry! This list not exist 😥')
      res.redirect('/list')
    }
    res.render("render/show.ejs", { list });
  })
);

//edit page only
router.get(
  "/:id/edit",islogin,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if(!list){
      req.flash('error','Sorry! This list not exist 😥')
      res.redirect('/list')
    }
    res.render("render/edit.ejs", { list });
  })
);

//update
router.put(
  "/:id",islogin,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findByIdAndUpdate(id, { ...req.body.list });
    req.flash('success' , ' Listing Updated 😘')
    res.redirect(`/list/${id}`);
  })
);

//delete
router.delete(
  "/:id",islogin,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success' , 'Listing Deleted 😁')
    res.redirect("/list");
  })
);

module.exports = router;