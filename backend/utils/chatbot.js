// utils/chatbot.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (message) => {
  try {
    if (!openai.apiKey) {
      throw new Error('OpenAI API key not configured');
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
    throw new Error('Error communicating with AI assistant');
  }
};

module.exports = { getChatResponse };