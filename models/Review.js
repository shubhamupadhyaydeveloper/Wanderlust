const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    star : {
        type : Number,
        default : 3
    } ,
    name : {
        type : String,
        required : true
    }  ,
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