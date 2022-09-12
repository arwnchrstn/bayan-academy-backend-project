const express = require("express");
const router = express.Router();
const Listing = require("../mongodb/models/ListingModel");

//get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//get all listings from specific user
router.get("/:user", async (req, res) => {
  try {
    const listings = await Listing.find({ username: req.params.user });
    res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//add a new listings
router.post("/addnew", async (req, res) => {
  try {
    const listing = Listing(req.body);
    res.status(200).send(await listing.save());
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//add a review to specific listing
router.post("/review/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    listing.reviews.unshift(req.body);
    res.status(200).json(await listing.save());
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
