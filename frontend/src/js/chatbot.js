// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatbotWindow = document.getElementById('chatbot-window');
  const openChatbotBtn = document.getElementById('open-chatbot');
  const closeChatbotBtn = document.getElementById('close-chatbot');
  const chatInput = document.getElementById('chat-input');
  const sendMessageBtn = document.getElementById('send-message');
  const chatMessages = document.getElementById('chat-messages');

  // Toggle chatbot window
  openChatbotBtn.addEventListener('click', function() {
    chatbotWindow.classList.remove('hidden');
    chatbotWindow.classList.add('chat-open');
  });

  closeChatbotBtn.addEventListener('click', function() {
    chatbotWindow.classList.remove('chat-open');
    chatbotWindow.classList.add('chat-close');
    setTimeout(() => {
      chatbotWindow.classList.add('hidden');
      chatbotWindow.classList.remove('chat-close');
    }, 300);
  });

  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';

    // Show typing indicator
    addTypingIndicator();

    // Send message to backend API
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
      // Remove typing indicator
      removeTypingIndicator();
      
      // Add bot response to chat
      addMessageToChat(data.reply, 'bot');
    })
    .catch(error => {
      // Remove typing indicator
      removeTypingIndicator();
      
      // Show error message
      addMessageToChat('Sorry, I\'m having trouble connecting to the assistant. Please try again later.', 'bot');
      console.error('Error:', error);
    });
  }

  // Add message to chat interface
  function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`, 'mb-3');

    const messageContent = document.createElement('div');
    messageContent.classList.add(sender === 'user' ? 'bg-blue-500 text-white' : 'bg-blue-100', 'rounded-lg', 'p-3', 'max-w-[80%]');
    
    if (sender === 'user') {
      messageContent.classList.add('ml-auto');
    }
    
    messageContent.textContent = message;
    messageDiv.appendChild(messageContent);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Add typing indicator
  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.classList.add('message', 'bot-message', 'mb-3');
    
    const typingContent = document.createElement('div');
    typingContent.classList.add('bg-blue-100', 'rounded-lg', 'p-3', 'max-w-[80%]');
    
    const dots = document.createElement('div');
    dots.classList.add('flex', 'space-x-1');
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.classList.add('w-2', 'h-2', 'bg-blue-500', 'rounded-full', 'animate-bounce');
      dot.style.animationDelay = `${i * 0.2}s`;
      dots.appendChild(dot);
    }
    
    typingContent.appendChild(dots);
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Event listeners for sending messages
  sendMessageBtn.addEventListener('click', sendMessage);
  
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});