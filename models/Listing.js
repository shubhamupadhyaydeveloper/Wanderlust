const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://media.istockphoto.com/id/185275043/photo/old-stone-house.jpg?s=2048x2048&w=is&k=20&c=8XtYRExld3vQIzHOBUWfdz62CgrN-_g2N0KcW1IH7w4="
        : v
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: String,
});

const Listing = mongoose.model("Listing", Schema);

module.exports = Listing;
