import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat messages when they update
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  const sendRequestToServer = async () => {
    if (userInput.trim() !== '') {
      const updatedMessages = [...messages, { role: 'user', content: userInput }];
      setMessages(updatedMessages);
      const authToken = localStorage.getItem('authToken');
      //console.log('hello authToken from chat',authToken);
      try {
        const response = await fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
          },
          body: JSON.stringify({ userMessage: userInput }),
        });

        if (!response.ok) {
          throw new Error('Server response not OK');
        }

        const data = await response.json();
        setTimeout(() => {
          // Add assistant message to the state without discarding existing messages
          setMessages([...updatedMessages, { role: 'assistant', content: `Assistant: ${data.response}` }]);
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
      }
      // Clear the user input field
      setUserInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h5>Chat with AI Assistant</h5>
        {/* <p>Ask me anything!</p> */}
      </div>
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          id="message-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={sendRequestToServer}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
