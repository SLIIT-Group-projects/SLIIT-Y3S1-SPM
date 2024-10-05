const router = require("express").Router();
const YieldCard = require("../models/yeild_card"); // Make sure model is imported properly
const { authenticationToken } = require("../src/utils/authMiddleware"); // Import the JWT authentication middleware
const User = require('../src/models/user');

// Middleware to apply authentication on all routes
router.use(authenticationToken);

// Add a new yield card
router.route("/add").post((req, res) => {
  const { image, b_title, b_description, buyer_name, buying_rate, buying_quantity } = req.body;

  const newYeildCard = new YieldCard({
    image,
    b_title,
    b_description,
    buyer_id: req.user.id, // Get the buyer_id from the JWT user
    buyer_name,
    buying_rate,
    buying_quantity,
  });

  newYeildCard.save()
    .then(() => res.json("Yield Card Added...!!"))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: "Error adding yield card", error: err.message });
    });
});

// Get all yield cards for the authenticated user
router.route("/").get((req, res) => {
  YieldCard.find({ buyer_id: req.user.id })  // Fetch only cards created by the authenticated user
    .then((cards) => res.json(cards))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: "Error fetching yield cards", error: err.message });
    });
});

// Update a yield card
router.route("/update/:id").put(async (req, res) => {
  const yeildId = req.params.id;
  const { image, b_title, b_description, buyer_name, buying_rate, buying_quantity } = req.body;

  const updateYeildCard = {
    image,
    b_title,
    b_description,
    buyer_name,
    buying_rate,
    buying_quantity,
  };

  try {
    const updatedYeild = await YieldCard.findOneAndUpdate(
      { _id: yeildId, buyer_id: req.user.id },  // Ensure the user owns the card being updated
      updateYeildCard,
      { new: true }
    );

    if (!updatedYeild) {
      return res.status(404).send({ status: "Yield card not found or unauthorized" });
    }

    res.status(200).send({ status: "Yield card updated", updatedYeild });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

// Delete a yield card
router.route("/delete/:id").delete(async (req, res) => {
  const yeildId = req.params.id;

  try {
    const deletedYeild = await YieldCard.findOneAndDelete({
      _id: yeildId,
      buyer_id: req.user.id,  // Ensure the user owns the card being deleted
    });

    if (!deletedYeild) {
      return res.status(404).send({ status: "Yield card not found or unauthorized" });
    }

    res.status(200).send({ status: "Yield card deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error with deleting yield card", error: err.message });
  }
});

// Get one yield card by ID (only for authenticated user)
router.route("/get/:id").get(async (req, res) => {
  const yeildId = req.params.id;

  try {
    const yeild = await YieldCard.findOne({ _id: yeildId, buyer_id: req.user.id });  // Ensure the user owns the card

    if (!yeild) {
      return res.status(404).send({ status: "Yield card not found or unauthorized" });
    }

    res.status(200).send({ status: "Yield card fetched", yeild });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with getting yield card", error: err.message });
  }
});



// buyer buying details of farmer
 // View all 
// router.route("/crop_selling/").get((req, res) => {
//     Yeild_farmer.find()
//         .then((yeilds) => res.json(yeilds))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send({ status: "Error fetching crop details", error: err.message });
//         });
// });
router.route("/crop_selling").get(authenticationToken, async (req, res) => {
    const buyerId = req.query.buyer_id;

    try {
        let query = {};
        if (buyerId) {
            query = { buyer_id: buyerId };
        }

        const yeilds = await Yeild_farmer.find(query);
        res.status(200).send(yeilds);
    } catch (err) {
        res.status(500).send({ status: "Error with getting yield cards", error: err.message });
    }
});

router.route("/h").get((req, res) => {
    YieldCard.find()  // Fetch only cards created by the authenticated user
      .then((cards) => res.json(cards))
      .catch((err) => {
        console.error(err);
        res.status(500).send({ status: "Error fetching yield cards", error: err.message });
      });
  });

// Other routes with token authentication...
router.route("/crop_selling/get/:id").get(authenticationToken, async (req, res) => {
    let yeildId = req.params.id;

    try {
        const yeild = await Yeild_farmer.findById(yeildId);
        if (!yeild) {
            res.status(404).send({ status: "Yield card not found" });
        } else {
            res.status(200).send({ status: "Yield card fetched", yeild });
        }
    } catch (err) {
        res.status(500).send({ status: "Error with getting yield card", error: err.message });
    }
});

// Farmer update route
router.route("/farmer/update/:id").put(authenticationToken, async (req, res) => {
    const yieldId = req.params.id;
    const { selling_quantity } = req.body; // Selling quantity to update

    try {
        const yieldCard = await YieldCard.findById(yieldId);

        if (!yieldCard) {
            return res.status(404).send({ status: "Yield card not found" });
        }

        // Ensure selling_quantity is valid
        if (isNaN(selling_quantity) || selling_quantity < 0) {
            return res.status(400).send({ status: "Invalid selling quantity" });
        }

        // Calculate the new selling quantity
        const newSellingQuantity = yieldCard.buying_quantity - selling_quantity; // Assuming selling_quantity is the quantity being sold

        // Validate that the new quantity is not negative
        if (newSellingQuantity < 0) {
            return res.status(400).send({ status: "Selling quantity cannot exceed available quantity" });
        }

        // Update the selling quantity in the database
        yieldCard.buying_quantity = newSellingQuantity;

        // Save the updated yield card
        const updatedYieldCard = await yieldCard.save();

        res.status(200).send({ status: "Yield card quantity updated", yield: updatedYieldCard });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error updating quantity", error: err.message });
    }
});

// Add a new yield card with farmer details
router.route("/farmer/add").post(authenticationToken, async (req, res) => {
    const { buyer_card_ID, b_title, b_description, buyer_id, buying_rate, selling_quantity, farmer_id } = req.body;

    try {
        console.log("Request Body:", req.body); // Log the incoming request data

        // const buyer = await User.findById(buyer_id);
        // console.log("Buyer:", buyer); // Log buyer details

        // const farmer = await User.findById(farmer_id);
        // console.log("Farmer:", farmer); // Log farmer details

        // if (!buyer) {
        //     return res.status(404).send({ status: "Buyer not found" });
        // }

        // if (!farmer) {
        //     return res.status(404).send({ status: "Farmer not found" });
        // }

        const newYieldCardFarmer = new Yield_card_farmer({
            buyer_card_ID,
            b_title,
            b_description,
            buyer: buyer_id, 
            buying_rate,
            selling_quantity,
            farmer: farmer_id, 
        });

        await newYieldCardFarmer.save();
        res.status(201).json({ status: "Yield added with farmer!", yield: newYieldCardFarmer });
    } catch (err) {
        console.log("Error occurred:", err); // Log the error details
        res.status(500).send({ status: "Error adding yield card with farmer", error: err.message });
    }
});
module.exports = router;
