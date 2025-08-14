const express = require('express');
const Session = require('../models/Session'); // Assuming you have a Session model
const Question = require('../models/Question'); // Assuming you have a Question model

exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated', success: false });
        }
        const userId = req.user._id; // Get the user ID from the request object
        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });
        let questionsDocs = [];
        if (Array.isArray(questions) && questions.length > 0) {
            questionsDocs = await Promise.all(questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id; // Return the question ID
            }));
        }
        session.questions = questionsDocs; // Assign the question IDs to the session
        await session.save(); // Save the session with the questions
        res.status(201).json({ success: true, session }); // Respond with the created session
    } catch (error) {
        res.status(500).json({ message: 'Server error', success: false });
    }
}
exports.getMySessions = async (req, res) => {
    try {
        const sessions=await Session.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('questions'); // Fetch sessions for the logged-in user
        res.status(200).json( sessions ); // Respond with the sessions
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', success: false });
        
    }
}
exports.getSessionById = async (req, res) => {

    try {
        const session = await Session.findById(req.params.id).populate({
            path:"questions",
            options: { sort: { isPinned: -1, createdAt: 1 } }
        }).exec(); // Fetch session by ID and populate questions
        if (!session) {
            return res.status(404).json({ message: 'Session not found', success: false });
        }
        res.status(200).json({ success: true, session }); // Respond with the session

        
    } catch (error) {
        res.status(500).json({ message: 'Server error', success: false });
        
    }
}
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found', success: false });
        }
        if (session.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this session', success: false });
        }
        await Question.deleteMany({session: session._id}); 
        await session.deleteOne(); 

         // Delete the session
        res.status(200).json({ message: 'Session deleted successfully', success: true }); // Respond with success message
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', success: false });
        
    }
}