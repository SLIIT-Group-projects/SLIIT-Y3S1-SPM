const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming you have a single User model for both buyers and farmers
const User = require('../src/models/user'); // Adjust the path accordingly

const yield_card_farmerSchema = new Schema({
    buyer_card_ID: {
        type: String,
        
    },
    b_title: {
        type: String,
        required: true,
    },
    b_description: {
        type: String,
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true,
    },
    farmer: {
        type: Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true,
    },
    buying_rate: {
        type: Number,
        required: true,
    },
    selling_quantity: {
        type: Number,
        required: true,
    },
});

const Yield_card_farmer = mongoose.model('Yield_card_farmer', yield_card_farmerSchema);
module.exports = Yield_card_farmer;
