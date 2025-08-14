const {GoogleGenAI}= require('@google/genai');

const { questionAnswerPrompt, conceptExplanationPrompt } = require('../utils/prompts');

const ai=new GoogleGenAI({apiKey: process.env.GENAI_API_KEY});

// @desc generate interview questions and answers using gemini
// @route POST /api/ai/generate-questions
// @access Private
exports.generateInterviewQuestion = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: 'Invalid request data'});
        }
        const prompt = questionAnswerPrompt({ role, experience, topicsToFocus, numberOfQuestions });
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents:prompt,

        })
        let rawText=response.text;
        //clean it:remove ```json and ``` from the start and end
        const cleanedText = rawText.replace(/^```json\s*/, '').replace(/```$/,"").trim();
        //now safe
        const data= JSON.parse(cleanedText);
        res.status(200).json (data )
        

    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}
// @desc generate concept explanation using gemini
// @route POST /api/ai/generate-explanation
// @access Private
exports.generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: 'Invalid request data' });
        }
        const prompt = conceptExplanationPrompt(question);
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents: prompt,
        });
        let rawText = response.text;
        //clean it:remove ```json and ``` from the start and end
        const cleanedText = rawText.replace(/^```json\s*/, '').replace(/```$/, "").trim();
        //now safe
        const data = JSON.parse(cleanedText);
        res.status(200).json( data );

        
    } catch (error) {
        res.status(500).json({ message: 'Failed to Generate explanation' });
        
    }
}

