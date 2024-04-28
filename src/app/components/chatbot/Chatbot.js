"use client"
import React, {useState} from 'react';
import './chatbot.css';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {text: input, sender: 'user'};
        setMessages(prevMessages => [...prevMessages, userMessage]);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: input.trim()})
        };

        try {
            const response = await fetch('/api/chat', options);
            if (!response.ok) {
                const errorText = await response.text(); // Get error details if possible
                throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
            }
            const data = await response.json();
            const botMessage = {text: data.message, sender: 'bot'};
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error fetching data from backend:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                {text: "We're having trouble reaching the chat service. Please try again later.", sender: 'bot'}
            ]);
        }

        setInput(''); // Clear the input after sending
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await sendMessage();
        }
    };

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
