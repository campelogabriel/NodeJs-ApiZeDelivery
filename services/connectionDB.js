const mongoose = require("mongoose");

const getConnection = async function () {
  const db = process.env.MONGO_URI.replace(
    "<password>",
    process.env.MONGO_PASSWORD
  );
  try {
    await mongoose.connect(db);
    // console.log("DB connection successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = getConnection;
