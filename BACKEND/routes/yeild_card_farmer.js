const router = require("express").Router();
const yeild = require("../models/yeild_card");
let Yeild = require("../models/yeild_card");



// yeild view
router.route("/").get((req,res)=>{
    yeild.find().then((yeilds)=>{
        res.json(yeilds)
    }).catch((err)=>{
        console.log(err)
    })
})