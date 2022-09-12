const express = require("express");
const router = express.Router();
const User = require("../mongodb/models/UserModel");

//User login
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (user) {
      if (
        req.body.username === user.username &&
        req.body.password === user.password
      )
        res.status(200).json(user);
      else {
        res.status(401).send("Username or password is incorrect");
      }
    } else {
      res.status(401).send("Username or password is incorrect");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//User signup
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User(req.body).save();

    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
