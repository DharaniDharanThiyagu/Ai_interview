const express = require('express');
const { toggleQuestion, updateQuestionNote, addQuestionToSession } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/add', protect, addQuestionToSession); // Add questions to a session
router.post('/:id/pin', protect, toggleQuestion); // Pin or unpin question
router.put('/:id/note', protect, updateQuestionNote); // Update question note

module.exports = router;
