function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message
  chatBox.innerHTML += `<div class="message user">You: ${userMessage}</div>`;

  // Simulate bot response
  let botMessage = getBotResponse(userMessage);
  chatBox.innerHTML += `<div class="message bot">Bot: ${botMessage}</div>`;

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I help you today?";
  if (msg.includes("your name")) return "I'm a simple chatbot.";
  if (msg.includes("bye")) return "Goodbye! Have a nice day!";
  return "Sorry, I didn’t understand that.";
}
