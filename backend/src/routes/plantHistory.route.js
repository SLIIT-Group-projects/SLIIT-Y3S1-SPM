const express = require("express");
const router = express.Router();
const History = require("../models/plantHistory");

router.route("/").get((req,res)=>{
    History.find().then((plantHistory)=>{
        res.json(plantHistory)
    }).catch((err)=>{
        console.log(err)
    })

})

// Add a new history record
router.post("/add", async (req, res) => {
  const history = new History({
    plantName: req.body.plantName,
    width: req.body.width,
    length: req.body.length,
    area: req.body.area,
    plantCount: req.body.plantCount,
  });

  try {
    const newHistory = await history.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
