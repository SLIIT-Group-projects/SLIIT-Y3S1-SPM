import { Schema, model } from 'mongoose';

const fertilizerSchema = new Schema({
  fer_name: { type: String, required: true },
  fer_price: { type: Number, required: true },
  fer_image: { type: String },
  fer_plants: { type: [String], required: true },
  fer_weight:{type: Number, required: true },
});

export default model('Fertilizer', fertilizerSchema);
