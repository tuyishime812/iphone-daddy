// utils/chatbot.js
// Conditionally import OpenAI only when needed
let OpenAI = null;

// Initialize OpenAI client only when needed and API key is available
let openaiClient = null;

const getOpenAIClient = () => {
  // Only load and initialize the client if we have a valid API key and haven't initialized it yet
  if (!openaiClient && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '') {
    try {
      // Dynamically import OpenAI only when needed
      if (!OpenAI) {
        OpenAI = require('openai');
      }
      
      openaiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } catch (error) {
      console.error('Error initializing OpenAI client:', error.message);
      return null;
    }
  }
  return openaiClient;
};

const getChatResponse = async (message) => {
  try {
    // Check if API key is available, if not return default response
    const client = getOpenAIClient();
    if (!client) {
      return "Thank you for your message! Our team will get back to you shortly. To enable the AI assistant, please configure the OPENAI_API_KEY environment variable.";
    }

    const response = await client.chat.completions.create({
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