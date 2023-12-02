const Review = require('../models/Review.js')
const Wrap = require('../error/WrapAsync.js')

const isAuthor = Wrap( async (req , res, next) => {
    let { id , reviewid  } = req.params;
    let review = await Review.findById(reviewid )
    if(!review.author._id.equals(res.locals.curruser._id)) {
      req.flash('error' , 'Sorry! Access not provide')
      return res.redirect(`/list/${id}`)
    }
    next()
})

module.exports = isAuthor;