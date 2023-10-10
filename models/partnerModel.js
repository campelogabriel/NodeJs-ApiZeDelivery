const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: new mongoose.Types.ObjectId().toHexString(),
    },
    tradingName: {
      type: String,
      required: [true, "Por favor, forneça um nome"],
    },
    ownerName: {
      type: String,
      required: [true, "Por favor, forneça o nome do proprietário"],
    },
    document: {
      type: String,
    },
    address: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    coverageArea: {
      type: {
        type: String,
        enum: ["MultiPolygon"],
      },
      coordinates: {
        type: [[[[Number]]]],
      },
    },
  },
  { _id: false }
);

partnerSchema.index({ address: "2dsphere" });

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
