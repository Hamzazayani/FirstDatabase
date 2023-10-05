const mongoose = require("mongoose");
require('dotenv').config();
const connectdb = async () => {
  try {
    mongoose.set("strictQuery", true);


    await mongoose.connect(process.env.URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectdb;
