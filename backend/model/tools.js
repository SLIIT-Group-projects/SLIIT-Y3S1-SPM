const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  tool_title: String,
  tool_photos: [String],
  tool_description: String,
  tool_perks: [String],
  tool_price: Number,
  tool_maxDays: Number,
});

const ToolModel = mongoose.model("Tool", toolSchema);

module.exports = ToolModel;
