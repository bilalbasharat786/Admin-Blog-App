import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes import (.js extension lazmi hai local files ke liye)
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Vercel par frontend se connect hone ke liye
app.use(express.json()); // JSON data ko parse karne ke liye

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("Database connection error: ", err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Vercel ke liye basic route check
app.get('/', (req, res) => {
    res.send("Admin Blog API is running perfectly with ES6!");
});

// Local testing ke liye PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Vercel deployment ke liye app export
export default app;