require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');
const { generateInterviewQuestion, generateConceptExplanation } = require('./controllers/aiController');
const { protect } = require('./middlewares/authMiddleware');

const app = express();

// Middleware
const allowedOrigins = [
    'https://ai-interview-k5ao.onrender.com',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/question', questionRoutes);
 app.use('/api/ai/generate-questions', protect, generateInterviewQuestion);
 app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
