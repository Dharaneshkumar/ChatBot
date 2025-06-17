// Redirect functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatbotButton = document.getElementById('chatbotButton');

  if (chatbotButton) {
    chatbotButton.addEventListener('click', function() {
      console.log("Redirecting to chatbot page...");
      window.location.href = 'chatbot.html';
    });
  } else {
    console.warn("Chatbot button not found - ensure element ID matches");
  }
});

// Chatbot functionality - only runs on chatbot.html
if (window.location.pathname.endsWith('chatbot.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Validate required elements exist
    if (!chatbox || !userInput || !sendButton) {
      console.error("Missing required chat elements");
      return;
    }

    const botResponses = {
      "hello": "Hi there! How can I help you today? 😊",
      "hi": "Hey! What's on your mind?",
      "how are you": "I'm just a bot, but I'm functioning well! How about you?",
      "bye": "Goodbye! Come back if you have more questions! 👋",
      "default": "I'm not sure how to respond. Try asking a question or type a math expression (e.g., 2+2)."
    };

    function addMessage(sender, message) {
      const messageDiv = document.createElement('div');
      messageDiv.className = sender === 'user' ? 'message user-message' : 'message bot-message';
      messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatbox.appendChild(messageDiv);
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    function isMathExpression(input) {
      return /^[\d+\-*/().\s]+$/.test(input) && 
             /[\+\-\*\/]/.test(input); // Must contain at least one operator
    }

    function calculateExpression(expr) {
      try {
        // Security note: In production, replace eval() with a math parser library
        const result = eval(expr);
        return isNaN(result) ? "Error: Invalid calculation" : result;
      } catch {
        return "Error: Invalid math expression";
      }
    }

    function handleUserInput() {
      const userMessage = userInput.value.trim();
      if (!userMessage) return;

      addMessage('user', userMessage);
      userInput.value = '';
      userInput.focus();

      setTimeout(() => {
        if (isMathExpression(userMessage)) {
          const result = calculateExpression(userMessage);
          addMessage('bot', `Result: <strong>${userMessage} = ${result}</strong>`);
        } else {
          const lowerCaseMsg = userMessage.toLowerCase();
          let botResponse = botResponses.default;
          
          for (const [keyword, response] of Object.entries(botResponses)) {
            if (lowerCaseMsg.includes(keyword)) {
              botResponse = response;
              break;
            }
          }
          addMessage('bot', botResponse);
        }
      }, 500);
    }

    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') handleUserInput();
    });

    // Initial greeting
    addMessage('bot', "Welcome! 😊");
  });
}
document.getElementById("LogoutButton").addEventListener("click", function() {
    window.location.href = "index.html"; 
});