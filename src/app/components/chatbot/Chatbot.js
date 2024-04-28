"use client";
import React, { useState } from 'react';
import './chatbot.css';

function Chatbot() {
  // handles state within functional components
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // hadles sending messages
  const sendMessage = async () => {
    if (!input.trim()) return; 
    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]); // updates message state

    // sends the mesg to the backend API
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input.trim() })
    };

    try {
      const response = await fetch('/api/chat', options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      // used to construct the bots response message and display it
      const botMessage = { text: data.message, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Error communicating with the chat service.", sender: 'bot' }]);
    }

    // clear the input after sending
    setInput(''); 
  };

   // detect key to send a message
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await sendMessage();
    }
  };

   // toggle the visibility of the chat interface
  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div id="chatbot-container">
      <button className="chatbot-trigger" onClick={toggleChatbot}>Chat with us!</button>
      {isVisible && (
        <div className="chatbot">
          <div className="messages-container">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;