const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../utils/chatbot');

// @route   POST api/chat
// @desc    Get response from AI assistant
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;