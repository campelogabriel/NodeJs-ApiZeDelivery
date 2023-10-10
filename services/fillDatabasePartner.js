const mongoose = require("mongoose");
const Partner = require("../models/partnerModel");
const partnersData = require("../pdvs.json");

const getConnection = async function () {
  const db =
    "mongodb://gabriel:VXhRpUDlj7Dx2NKt@ac-t9ygqht-shard-00-00.tz3i79q.mongodb.net:27017,ac-t9ygqht-shard-00-01.tz3i79q.mongodb.net:27017,ac-t9ygqht-shard-00-02.tz3i79q.mongodb.net:27017/zeDelivery?ssl=true&replicaSet=atlas-4dkcme-shard-0&authSource=admin&retryWrites=true&w=majority";

  try {
    await mongoose.connect(db);
    console.log("DB connection successfully");
  } catch (err) {
    3;
    console.log(err);
  }
};

getConnection();

Partner.collection
  .insertMany(partnersData)
  .then(() => console.log("saved"))
  .catch((err) => console.log(err));
