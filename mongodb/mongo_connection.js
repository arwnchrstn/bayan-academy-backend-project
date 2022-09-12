const mongoose = require("mongoose");

const mongooseConnect = () => {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log(err);

      console.log("Connected to Mongo DB Atlas");
    }
  );
};

module.exports = mongooseConnect;
