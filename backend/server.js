import express from 'express';
import { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import route from './routes/FertilizerRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies and other credentials
}));
app.use(json());
app.use('/uploads', express.static('uploads')); // to serve uploaded images


// Database connection
connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


app.use('/api', route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
