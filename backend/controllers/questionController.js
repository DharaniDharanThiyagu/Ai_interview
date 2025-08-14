const Question = require('../models/Question');
const Session = require('../models/Session');

// Add questions to a session
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;
        
        // Validate request
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid request data', success: false });
        }

        // Find session
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found', success: false });
        }

        // Create questions with session reference
        const createdQuestions = await Question.insertMany(
            questions.map(q => ({
                session: sessionId,
                question: q.question,
                answer: q.answer
            }))
        );

        // Add question IDs to session
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();

        res.status(201).json({ success: true, createdQuestions });

    } catch (error) {
        console.error('Error adding question to session:', error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// Toggle pinned status of a question
exports.toggleQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found', success: false });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ success: true, question });

    } catch (error) {
        console.error('Error toggling question:', error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// Update note for a question
exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { note: note || "" },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found', success: false });
        }

        res.status(200).json({ success: true, question: updatedQuestion });

    } catch (error) {
        console.error('Error updating question note:', error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};
