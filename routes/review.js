const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../error/WrapAsync.js");
const ExpressError = require("../error/ExpressError.js");
const Listing = require("../models/Listing.js");
const Review = require("../models/Review.js");
const { Reviewschema } = require("../schema.js");

function checkreview(req, res, next) {
  let joi = Reviewschema.validate(req.body);
  if (joi.error) {
    throw new ExpressError(400, joi.error);
  } else {
    next();
  }
}

// reviewpost
router.post(
  "/",
  checkreview,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);

    listing.review.push(review);

    await listing.save();
    await review.save();

    req.flash("success", " New Review Created 😘");

    res.redirect(`/list/${id}`);
  })
);

// reviewdelete
router.delete(
  "/:reviewid",
  WrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewid } });

    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review Delete 😘");

    res.redirect(`/list/${id}`);
  })
);

module.exports = router;
