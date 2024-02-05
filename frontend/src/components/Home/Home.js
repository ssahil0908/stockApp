import React, { useState } from 'react';
import Chat from '../Chat/Chat'; // Import the Chat component
import './Home.css';
import AiAnalysis from '../Aianalysis/Aianalysis';
import Tools from '../Tools/Tools';
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook
import { useHistory } from 'react-router-dom'; // Import useHistory
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
  // Use state to manage the current content
  const [currentContent, setCurrentContent] = useState('home');
  const { isAuthenticated, login } = useAuth(); // Use the useAuth hook
  const history = useHistory(); // Initialize useHistory hook

  // Define functions to load different content
  const loadToolContent = () => setCurrentContent('tool');
  const loadChatContent = () => setCurrentContent('chat');
  const loadAnalysisContent = () => setCurrentContent('analysis');

  const handleLogin = () => {
    // Call the login function from the AuthContext
    login();
  };
  const goToHome = () => {
    setCurrentContent('home');
    history.push('/');
  };

  return (
    <>
      {/* Add a button to return to the home page */}
    {currentContent !== 'home' && (
      <FontAwesomeIcon icon={faArrowLeft} className="home-icon" onClick={goToHome} />  )}
      
      {currentContent === 'home' && (
        <>
        <div className="home-container">
          <h1>Welcome to the Stock Analysis App</h1>
          <p>Explore various tools for stock analysis</p>
          <div className="button-container">
            <button onClick={loadToolContent}>Stock Analysis Tools</button>
            <button onClick={loadChatContent} disabled={!isAuthenticated}>
               Chat with AI Assistant
              {/* {!isAuthenticated && <span className="lock-icon">  🔒</span>} */}
              {!isAuthenticated && ( <span className="lock-icon" title="Login to unlock this feature">   🔒</span> )}
            </button>

            <button onClick={loadAnalysisContent} disabled={!isAuthenticated}>
               Stock Analysis with AI
              {/* {!isAuthenticated && <span className="lock-icon">  🔒</span>} */}
              {!isAuthenticated && ( <span className="lock-icon" title="Login to unlock this feature">   🔒</span> )}

            </button>
          </div>
          </div>
        </>
      )}

      
    {currentContent === 'chat' && <Chat />}
    {currentContent === 'analysis' && <AiAnalysis />}
    {currentContent === 'tool' && <Tools />}

    
    </>
  );
};

export default Home;
