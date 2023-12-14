const mongoose = require("mongoose");
const Review = require("../models/Review.js");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url : String,
    filename : String
  
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: String,
  coordinates : {
    type : [Number]
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ], 
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  } ,
  category : {
    type : String,
    enum : ['mountain' , 'forest' ,'hills' , 'swim' , 'villa' , 'warehouse' , 'city' , 'castle' , 'boat' , 'igloo' , 'trending']
  }
});

Schema.post("findOneAndDelete", async (data) => {
    await Review.deleteMany({ _id : {$in : data.review}});
});

const Listing = mongoose.model("Listing", Schema);
module.exports = Listing;
