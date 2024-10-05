const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Import the routes
const toolsRoutes = require("./routes/tools");

dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

// Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connection success");
});

// Use the routes
app.use(toolsRoutes);

app.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`);
});
