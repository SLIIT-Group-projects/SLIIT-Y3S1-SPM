const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  plantCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);
