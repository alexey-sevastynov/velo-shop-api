const mongoose = require("mongoose");

const BicycleScheme = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    category: { type: String, require: true },
    novelty: { type: Boolean, require: true },
    manufacturer: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceSale: Number,
    size: {
      type: Array,
      required: true,
    },
    color: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    diameter: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    tires: String,
    frame: String,
    saddle: String,
    seatpost: String,
    fork: String,
    chain: String,
    brake: String,
    speed: String,
    garantine: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Bicycle = mongoose.model("Bicycle", BicycleScheme);

module.exports = Bicycle;
