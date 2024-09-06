const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

//create connection using url in .env
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {

});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

// this is th route for yeild table
const yeildCardRouter = require("./routes/yeild_cards.js");
app.use("/yeildCard",yeildCardRouter)



app.listen(PORT, () => {
  console.log(`Server is up and running on port is : ${PORT}`);
});

