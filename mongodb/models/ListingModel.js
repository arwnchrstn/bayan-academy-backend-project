const mongoose = require("mongoose");

//Listing schema
const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date_posted: {
    type: Date,
    required: true,
    default: Date.now()
  },
  location: {
    place: {
      type: String,
      required: true,
      trim: true
    },
    lat: {
      type: Number,
      required: true,
      trim: true
    },
    long: {
      type: Number,
      required: true,
      trim: true
    }
  },
  reviews: [
    {
      username: {
        type: String,
        required: true,
        trim: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      date_reviewed: {
        type: Date,
        required: true,
        default: Date.now()
      }
    }
  ]
});

//Listing model
const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
