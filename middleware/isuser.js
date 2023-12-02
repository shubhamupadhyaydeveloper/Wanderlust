const Listing = require('../models/Listing.js')
const Wrap = require('../error/WrapAsync.js')

const isuser = Wrap( async (req , res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    if(!listing.owner._id.equals(res.locals.curruser._id)) {
      req.flash('error' , 'Sorry! Access not provide')
      return res.redirect(`/list/${id}`)
    }
    next()
})

module.exports = isuser;