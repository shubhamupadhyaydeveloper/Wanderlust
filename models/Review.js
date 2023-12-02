const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    star : {
        type : Number,
        default : 3
    } ,
    author : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    } ,
    comment : {
        type : String,
        required : true
    } ,
    createdat : {
        type : Date,
        default : Date.now()
    }
})

const Review = mongoose.model('Review' , reviewSchema)

module.exports = Review;