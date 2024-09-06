const express=require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
require("dotenv").config();
const plantRoutes = require("./src/routes/plants.route");
const plantHistoryRoute = require("./src/routes/plantHistory.route");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

 const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error("Please add the connection string.")
        }
        await mongoose.connect(connectionString);
        console.log("DB connection successful!!");
    } catch (error) {
        console.log("DB connection failed!!")
        console.log(error)
    
    }
}

connectDB();
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// siluni
app.use("/plant", plantRoutes)
app.use("/planthistory", plantHistoryRoute)