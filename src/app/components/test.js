/*
"use client";
import React, { useState } from 'react';

function Chatbot() { 
  // hanles  state within functional components, statevariabl and setvalue
  const [messages, setMessages] = useState([]); // adds to the list
  const [input, setInput] = useState(''); // empty string

  // handles sending messages
  const sendMessage = async () => {
    if (!input.trim()) return; // checks validity
    const userMessage = { text: input, sender: 'user' }; // message object
    setMessages(prevMessages => [...prevMessages, userMessage]); // function updates the state

    // Send the message to the backend API
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input.trim() })
    }

    try {
      const response = await fetch('/api/chat', options)
      if (!response.ok) {
        const t = await response.text();
        console.log(t);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data parsed from the response:', data); // Log the data received from the server
      
      // Append the returned message to the conversation
      const botMessage = { text: data.message, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const status = error.response?.status || 500; // Safely access status, defaulting to 500 if unavailable
      if (status === 429) {
        showAlert("We've hit our rate limit. Please try again later.");
      } else {
        showAlert("An error occurred. Please try again later.");
      }
      console.error("Error sending message:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Error communicating with the support bot.", sender: 'bot' }]);
    }
    

    // Clear the input for the next message
    setInput('');
  };

  // Detect 'Enter' key to send a message
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
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
  );
}

export default Chatbot;





this code is chat.js
async function fetchWithRetry(url, options, retries = 5, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) { // we only want to retry on too many requests
      console.log(`Waiting ${delay}ms before retrying...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2); // Double the delay for the next retry
    } else {
      throw error;
    }
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract the user message from the request body
    const { message: userMessage } = req.body;
    // Set up the payload for the OpenAI API request, including the conversation history
    const payload = {
      model: "gpt-3.5-turbo", 
      prompt: userMessage, 
      max_tokens: 100,
    };
    // Make the request to the OpenAI API
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const openaiResponse = await fetchWithRetry('https://api.openai.com/v1/chat/completions', requestOptions);
      // Parse the response from OpenAI
      const data = await openaiResponse.json(); 
      // Send the AI response back to the client 
      res.status(200).json({ message: data.choices[0].text }); // respons based on the prompt provided. the first element is the primary response from oprnai
    } catch (error) {
      // Log and respond to errors
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).end();
  }
}


*/