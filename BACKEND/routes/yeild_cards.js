const router = require("express").Router();
const yeild = require("../models/yeild_card");
let Yeild = require("../models/yeild_card");


router.route("/add").post((req,res)=>{
    //catch the details from in request body that come from frontend
    const buyer_card_ID = req.body. buyer_card_ID;
    const image = req.body.image; // Make sure this matches the frontend key 'image'
    const b_title = req.body.b_title;
    const b_description = req.body.b_description;
    const buyer_id = req.body.buyer_id;
    const buyer_name = req.body.buyer_name;
    const buying_rate = Number(req.body.buying_rate);
    const buying_quantity = Number(req.body.buying_quantity);

    const newYeildCard = new Yeild({
        buyer_card_ID,
        image,
        b_title,
        b_description,
        buyer_id,
        buyer_name,
        buying_rate,
        buying_quantity
    })

    //save in database and gave console msg or log errors(exception handilng)
    newYeildCard.save().then(()=>{
        res.json("Yeild Card Added...!!")
    }).catch((err)=>{
        console.log(err);
    })
})



// yeild view
router.route("/").get((req,res)=>{
    yeild.find().then((yeilds)=>{
        res.json(yeilds)
    }).catch((err)=>{
        console.log(err)
    })
})

//update the product
router.route("/update/:id").put(async(req,res)=>{
    let yeildId = req.params.id;
    const {image,b_title,b_description,buyer_id,buyer_name,buying_rate,buying_quantity
    }=req.body;
    
    const updateYeildCard = {
        image,
        b_title,
        b_description,
        buyer_id,
        buyer_name,
        buying_rate,
        buying_quantity
    }
    const update = await yeild.findByIdAndUpdate(yeildId,updateYeildCard).then((yeild)=>{
        res.status(200).send({status:"yeild card updated",yeild})
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"error with updating data",error:err.message});
    })
})

//delete operation for products
router.route("/delete/:id").delete(async(req,res)=>{
    let yeildId = req.params.id;
    await yeild.findByIdAndDelete(yeildId).then(()=>{
        res.status(200).send({status:"yeild card deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete yeild card",error:err.message});
    })
}) 

// get one product
router.route("/get/:id").get(async(req,res)=>{
    let yeildId=req.params.id;
    //product.findOne(email)
   const yeildO =  await yeild.findById(yeildId).then((yeild)=>{
        res.status(200).send({status:"yeild card fetched",yeild})
    }).catch(()=>{
        res.status(500).send({status:"error with get yeild card",error:err.message});
    })
})



module.exports = router;
