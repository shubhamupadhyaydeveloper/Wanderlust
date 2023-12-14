const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../error/WrapAsync.js");
const ExpressError = require("../error/ExpressError.js");
const Listing = require("../models/Listing.js");
const { Listschema } = require("../schema.js");
const islogin = require("../middleware/islogged.js");
const isuser = require("../middleware/isuser.js");
const { storage } = require("../cloud.js");
const multer = require("multer");
const upload = multer({ storage });

function checkvalidation(req, res, next) {
  let joi = Listschema.validate(req.body);
  if (joi.error) {
    throw new ExpressError(400, joi.error);
  } else {
    next();
  }
}

//new page
router.get("/new", islogin, (req, res) => {
  res.render("render/new.ejs");
});

//create
router.post(
  "/",
  islogin,
  upload.single("list[image]"),
  checkvalidation,
  WrapAsync(async (req, res, next) => {
    let listing = new Listing(req.body.list);
    let request = await fetch(`https://nominatim.openstreetmap.org/search?q=${listing.location}&limit=1&format=json`)
    let data = await request.json()
    let lat = parseFloat(data[0].lat)
    let lon = parseFloat(data[0].lon)
    console.log(lat , lon)
    listing.coordinates = [lat ,lon]

    listing.owner = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename
    listing.image = {url , filename}
    req.flash('success' , 'new listing created 😍')
    await listing.save();
    res.redirect("/");
  })
);

//show result
router.get(
  "/:id",
  WrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id)
      .populate({
        path: "review",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!list) {
      req.flash("error", "Sorry! This list not exist 😥");
      res.redirect("/list");
    }
    res.render("render/show.ejs", { list });
  })
);

//edit page only
router.get(
  "/:id/edit",
  islogin,
  isuser,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (!list) {
      req.flash("error", "Sorry! This list not exist 😥");
      return res.redirect("/");
    }
    res.render("render/edit.ejs", { list });
  })
);

//update
router.put(
  "/:id",
  islogin,
  isuser,
  upload.single("list[image]"),
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findByIdAndUpdate(id, { ...req.body.list });
    if(typeof req.file != 'undefined') {
      let url = req.file.path;
      let filename = req.file.filename
      list.image = {url , filename}
      console.log(list)
    }
   await list.save()
    req.flash("success", " Listing Updated 😘");
    res.redirect(`/list/${id}`);
  })
);

//delete
router.delete(
  "/:id",
  islogin,
  isuser,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted 😁");
    res.redirect("/");
  })
);

module.exports = router;
