const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yieldCardSchema = new Schema({
  image: String,
  b_title: {
    type: String,
    required: true,
  },
  b_description: {
    type: String,
    required: true,
  },
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the user who added the card
    required: true,
  },
  buyer_name: {
    type: String,
    required: true,
  },
  buying_rate: {
    type: Number,
    required: true,
  },
  buying_quantity: {
    type: Number,
    required: true,
  },
});

const YieldCard = mongoose.model("YieldCard", yieldCardSchema);
module.exports = YieldCard;