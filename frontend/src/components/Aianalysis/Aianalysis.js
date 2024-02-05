import React, { useState } from 'react';
import './Aianalysis.css'; 

const Aianalysis = () => {
  const [searchInput, setSearchInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const searchRequestToServer = async () => {
    if (searchInput.trim() !== '') {
      // Display user's search query in the chat
      const userMessage = { role: 'user', content: ` ${searchInput}` };

      try {
        // Send request to the server for analysis
        const response = await fetch('/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userQuery: searchInput }),
        });

        if (!response.ok) {
          throw new Error('Server response not OK');
        }
        const data = await response.json();
        //console.log('hello data',data);
        // Display the user message and the server's analysis in the chat
        setChatMessages([userMessage, { role: 'server', content: ` ${data.response}` }]);
      } catch (error) {
        console.error('Error:', error);
      }
      // Clear the input field
      setSearchInput('');
    }
  };

  return (
    <div id="chat-container" className="aianalysis-container">
      <div className="chat-header">
        <h5>Analyze data with AI</h5>
      </div>
      <div id="search-box" className="search-box">
        <input
          type="text"
          id="search-input"
          placeholder="Type Company Name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button id="search-button" onClick={searchRequestToServer}>Search</button>
      </div>
      <div id="chat-messages" className="chat-messages">
        {chatMessages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aianalysis;
