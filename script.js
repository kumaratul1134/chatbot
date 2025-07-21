const API_KEY = '';
const chatBox = document.getElementById('chat-box');

async function sendMessage() {
  const input = document.getElementById('user-input');
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage('user', `You: ${userMessage}`);
  input.value = '';
  scrollChatToBottom();

  try {
    const botResponse = await getGeminiResponse(userMessage);
    addMessage('bot', `Bot: ${botResponse}`);
    scrollChatToBottom();
  } catch (err) {
    addMessage('bot', `Bot: Error fetching response.`);
  }
}

function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
}

function scrollChatToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getGeminiResponse(userInput) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userInput }] }]
    })
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response.";
}

