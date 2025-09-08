import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleStartGame = () => {
    setCurrentPage('game');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-vintage-cream">
      {currentPage === 'landing' ? (
        <LandingPage onStartGame={handleStartGame} />
      ) : (
        <GamePage onBackToLanding={handleBackToLanding} />
      )}
    </div>
  );
}

export default App;
