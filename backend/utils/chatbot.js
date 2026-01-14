// utils/chatbot.js
const OpenAI = require('openai');

// Initialize OpenAI client only if API key is available
let openai = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const getChatResponse = async (message) => {
  try {
    // If no API key is configured, return a default response
    if (!openai || !openai.apiKey) {
      return "Thank you for your message! Our team will get back to you shortly. To enable the AI assistant, please configure the OPENAI_API_KEY environment variable.";
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant for iPhone Daddy, an online store selling iPhones and merchandise. Answer customer questions about products, shipping, returns, and store policies. Be friendly and helpful.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error communicating with AI assistant:', error);
    // Return a helpful message if there's an error
    return "Sorry, I'm having trouble connecting to the AI service right now. Our team will get back to you as soon as possible!";
  }
};

module.exports = { getChatResponse };