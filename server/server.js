require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const listingRoutes = require("./routes/ListingRoutes");
const mongooseConnect = require("./mongodb/mongo_connection");

//start mongoose
mongooseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ORIGIN
  })
);
app.use("/user", userRoutes);
app.use("/listing", listingRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
