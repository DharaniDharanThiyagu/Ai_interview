const questionAnswerPrompt= ({role,experience,topicsToFocus,numberOfQuestions})=>{
    return `You are an AI trained  generate interview questions and answers.
    
    Task:
    -Role: ${role}
    -Candidate Experience: ${experience} years
    -Topics to Focus: ${topicsToFocus}
    -Write ${numberOfQuestions} interview questions
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example ,add a small code block inside
    -Return a pure JSON array like:
    [
        {
            "question": "What is the purpose of a constructor in a class?",
            "answer": "A constructor is a special method used to initialize objects. It is called when an instance of the class is created."
        },
        {
            "question": "Explain the concept of inheritance in OOP.",
            "answer": "Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing a relationship between classes."
        },
        ...
    ]
        Important:Do Not add any extra ,Only return valid JSON`
    
}
const conceptExplanationPrompt = (question) => {
    return`You are an AI trained to generate explanations for a interview question.
   Task:
   
   - Explain the following interview question and its concept in de1pth as if you're teaching a beginner developer .
   - Question: ${question}
   -After the explanation, provide a short and short and clear title that summarizes the concept for the article or page header.
   - Return the result as a valid JSON  in the following format:
    {
         
         "title": "A concise title summarizing the concept",
         "explanation": "Your detailed explanation goes here."
    }
         Important: Do not add any extra text outside the JSON format. Only return valid JSON.`
    
}
module.exports = {
    questionAnswerPrompt,
    conceptExplanationPrompt
};