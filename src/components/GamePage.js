  import React, { useState, useEffect } from 'react';
  import WorldMap from './WorldMap';
  import gameService from '../services/gameService';

  const GamePage = ({ onBackToLanding }) => {
    const [gameStatus, setGameStatus] = useState(gameService.getGameStatus());
    const [mapView, setMapView] = useState(gameService.getMapView());
    const [guessInput, setGuessInput] = useState({ location: '', country: '' });
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);

    // Update game status when component mounts or game state changes
    useEffect(() => {
      setGameStatus(gameService.getGameStatus());
      setMapView(gameService.getMapView());
    }, []);

    // Create markers for the current location (only show when game is won)
    const getMarkers = () => {
      if (gameStatus.gameState === 'won') {
        return [{
          position: [gameStatus.currentPlace.latitude, gameStatus.currentPlace.longitude],
          popup: {
            title: `${gameStatus.currentPlace.name}, ${gameStatus.currentPlace.country}`,
            content: gameStatus.currentPlace.feature
          }
        }];
      }
      return [];
    };

    const handleMapClick = (e) => {
      console.log('Map clicked at:', e.latlng);
      // Future: Handle map clicks for guess input
    };

    const handleGetNextHint = () => {
      const nextHint = gameService.getNextHint();
      if (nextHint) {
        setGameStatus(gameService.getGameStatus());
        setMapView(gameService.getMapView());
      }
    };

    const handleSubmitGuess = async () => {
      if (!guessInput.location.trim() || !guessInput.country.trim()) {
        setFeedback('Please enter both location and country.');
        setShowFeedback(true);
        return;
      }

      // Show loading state
      setFeedback('Validating your guess...');
      setShowFeedback(true);

      try {
        const guessResult = await gameService.submitGuess(guessInput);

        setGameStatus(gameService.getGameStatus());
        
        if (guessResult.isCorrect) {
          setFeedback('🎉 Congratulations! You found the Fooqawhi!');
          setMapView(gameService.getMapView(guessResult));
        } else if (guessResult.error) {
          setFeedback(`❌ Error: ${guessResult.error}. Please check your location and country names.`);
        } else {
          // Provide distance and direction-based feedback
          const distance = guessResult.distance;
          const direction = guessResult.direction;
          let feedbackText = '';
          
          if (distance < 100) {
            feedbackText = `🔥 Very close! You're only ${distance}km away. The Fooqawhi are to the ${direction}.`;
          } else if (distance < 500) {
            feedbackText = `📍 Getting warmer! You're ${distance}km away. Head ${direction} to find the Fooqawhi.`;
          } else if (distance < 1000) {
            feedbackText = `🌍 You're ${distance}km away. The Fooqawhi are ${direction} of your location.`;
          } else if (distance < 3000) {
            feedbackText = `🗺️ Are you sure you're looking for the Fooqawhi?  They are ${distance}km ${direction} of here.`;
          } else {
            feedbackText = `🌏 You're ${distance}km away. The Fooqawhi are very far ${direction} of your guess.`;
          }
          setFeedback(feedbackText);
        }
      } catch (error) {
        console.error('Error submitting guess:', error);
        setFeedback('❌ An error occurred while validating your guess. Please try again.');
      }
      handleGetNextHint()

      setShowFeedback(true);
      setGuessInput({ location: '', country: '' });
    };

    const handleInputChange = (field, value) => {
      setGuessInput(prev => ({ ...prev, [field]: value }));
      setShowFeedback(false);
    };

    return (
      <div className="min-h-screen bg-vintage-cream">
        <header className="vintage-header">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <button 
                onClick={onBackToLanding}
                className="vintage-button text-sm px-4 py-2"
              >
                ← Back to Lore
              </button>
              <div className="text-center">
                <h1 className="text-center uppercase tracking-wider">
                Where the Fooqawhi?
                </h1>
              </div>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          {/* Map Section */}
          <div className="vintage-card max-w-6xl mx-auto mb-8">
            <h2 className="text-center mb-6">
              The World Awaits
            </h2>
            
            <div className="vintage-divider"></div>
            
            <div className="vintage-text mb-6">
              <p className="text-center">
                The Fooqawhi are an ancient people of unknown origin. 
                Their history is shrouded in mystery, and their origins remain one of the greatest enigmas of our time. 
                They have kept records of their travels. Read the description of today's location, pieced together from fragmants of their record and try to guess Where the Fooqawhi!
                The Fooqawhi are somewhere in the world, waiting for you to find them. 
                Use the map below to explore and make your guesses.
              </p>
            </div>
            
            {/* Interactive World Map */}
            <div className="mb-6">
              <WorldMap
                center={mapView.center}
                zoom={mapView.zoom}
                markers={getMarkers()}
                onMapClick={handleMapClick}
                className="h-96 w-full"
              />
            </div>
            
            <div className="text-center">
              <div className="vintage-badge mb-4">
                {gameStatus.gameState === 'won' ? '🎉 Fooqawhi Found!' : 
                gameStatus.gameState === 'lost' ? '😔 Game Over' : 
                '🗺️ Interactive Map Ready'}
              </div>
              <p className="vintage-text text-sm">
                {gameStatus.gameState === 'won' ? 'The Fooqawhi have been located!' :
                gameStatus.gameState === 'lost' ? 'The Fooqawhi remain lost...' :
                'Click and drag to explore • Use zoom controls • Click markers for information'}
              </p>
            </div>
          </div>

          {/* Game Controls Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Hints */}
            <div className="vintage-card">
              <h3 className="text-center mb-6">
              From the Fooqawhi's travel record: 
              </h3>

              <div className="space-y-4">

              </div>


              <div className="space-y-4">
                {gameStatus.currentHint && (
                  <div className="vintage-highlight">            
                    <p className="font-semibold">
                      Hint number: {gameStatus.currentHint.hintNumber} 
                    </p>
                    <p>{gameStatus.hintsGiven} <b>{gameStatus.currentHint.text}.. </b></p>
                  </div>)}
              </div>
            </div>

            {/* Right Column - Guess Input */}
            <div className="vintage-card">
              <h3 className="text-center mb-6">
                Make Your Guess
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-vintage-dark font-semibold mb-2">
                    Location Name:
                  </label>
                  <input
                    id="location-input"
                    type="text"
                    placeholder="Enter your guess..."
                    value={guessInput.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={gameStatus.gameState !== 'playing'}
                    className="vintage-input w-full disabled:opacity-50"
                  />
                </div>
                
                <div>
                  <label className="block text-vintage-dark font-semibold mb-2">
                    Country:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country..."
                    value={guessInput.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    disabled={gameStatus.gameState !== 'playing'}
                    className="vintage-input w-full disabled:opacity-50"
                  />
                </div>
                
                <button 
                  onClick={handleSubmitGuess}
                  disabled={gameStatus.gameState !== 'playing'}
                  className="vintage-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Guess
                </button>
                
                {showFeedback && (
                  <div className={`p-3 rounded-vintage border-2 ${
                    feedback.includes('Congratulations') ? 'bg-green-100 border-green-500 text-green-800' :
                    feedback.includes('Please enter') ? 'bg-yellow-100 border-yellow-500 text-yellow-800' :
                    'bg-red-100 border-red-500 text-red-800'
                  }`}>
                    <p className="text-sm font-semibold">{feedback}</p>
                  </div>
                )}
                
                <div className="vintage-highlight">
                  <p className="text-sm">
                    <strong>Hints Used:</strong> {gameStatus.hintsUsed} of {gameStatus.totalHints}<br/>
                    <strong>Guesses Made:</strong> {gameStatus.guessesMade} of {gameStatus.maxGuesses}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Section */}
          <div className="vintage-card max-w-4xl mx-auto mt-8">
            <h3 className="text-center mb-4">
              Adventure Status
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="vintage-badge mb-2">💡</div>
                <h4 className="font-semibold text-vintage-dark">Hints</h4>
                <p className="vintage-text text-sm">{gameStatus.hintsUsed} of {gameStatus.totalHints} used</p>
              </div>
              
              <div>
                <div className="vintage-badge mb-2">🎯</div>
                <h4 className="font-semibold text-vintage-dark">Guesses</h4>
                <p className="vintage-text text-sm">{gameStatus.guessesMade} of {gameStatus.maxGuesses} made</p>
              </div>
              
              <div>
                <div className="vintage-badge mb-2">🏆</div>
                <h4 className="font-semibold text-vintage-dark">Status</h4>
                <p className="vintage-text text-sm">
                  {gameStatus.gameState === 'won' ? 'Victory!' :
                  gameStatus.gameState === 'lost' ? 'Game Over' :
                  'In Progress'}
                </p>
              </div>
            </div>
            
            {/* Enhanced Victory Screen */}
            {gameStatus.gameState === 'won' && (
              <div className="mt-6 animate-fade-in">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-500 rounded-vintage shadow-vintage victory-glow">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2 celebration-emoji">🎉</div>
                    <h3 className="font-headline text-2xl text-green-800 mb-2 fade-in-up">
                      The Fooqawhi Have Been Found!
                    </h3>
                    <p className="text-green-700 italic">
                      "At last, the ancient guardians reveal themselves to the worthy seeker."
                    </p>
                  </div>
                  
                  <div className="bg-white/70 p-4 rounded-vintage mb-4">
                    <h4 className="font-semibold text-vintage-dark text-lg mb-2">📍 Location Discovered</h4>
                    <div className="space-y-2">
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Place:</span> {gameStatus.currentPlace.name}
                      </p>
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Country:</span> {gameStatus.currentPlace.country}
                      </p>
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Feature:</span> {gameStatus.currentPlace.feature}
                      </p>
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Coordinates:</span> {gameStatus.currentPlace.latitude.toFixed(4)}°N, {gameStatus.currentPlace.longitude.toFixed(4)}°E
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 p-4 rounded-vintage mb-4">
                    <h4 className="font-semibold text-vintage-dark text-lg mb-2">🏆 Quest Performance</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Time:</span> {gameStatus.gameTime}
                      </div>
                      <div>
                        <span className="font-semibold">Hints Used:</span> {gameStatus.hintsUsed}/{gameStatus.totalHints}
                      </div>
                      <div>
                        <span className="font-semibold">Guesses Made:</span> {gameStatus.guessesMade}/{gameStatus.maxGuesses}
                      </div>
                      <div>
                        <span className="font-semibold">Efficiency:</span> {Math.round((1 - gameStatus.hintsUsed / gameStatus.totalHints) * 100)}%
                      </div>
                    </div>
                  </div>
                  
                  {gameStatus.achievements && gameStatus.achievements.length > 0 && (
                    <div className="bg-white/70 p-4 rounded-vintage mb-4">
                      <h4 className="font-semibold text-vintage-dark text-lg mb-2">🏅 Achievements Unlocked</h4>
                      <div className="space-y-2">
                        {gameStatus.achievements.map((achievement, index) => (
                          <div key={achievement.id} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                            <span className="text-lg">{achievement.icon}</span>
                            <div>
                              <div className="font-semibold text-yellow-800">{achievement.title}</div>
                              <div className="text-xs text-yellow-700">{achievement.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="vintage-button bg-green-600 hover:bg-green-700 text-white px-6 py-2 mr-3"
                    >
                      🔄 New Quest
                    </button>
                    <button
                      onClick={onBackToLanding}
                      className="vintage-button bg-vintage-dark hover:bg-vintage-darker text-white px-6 py-2"
                    >
                      📚 Back to Lore
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Enhanced Defeat Screen */}
            {gameStatus.gameState === 'lost' && (
              <div className="mt-6 animate-fade-in">
                <div className="p-6 bg-gradient-to-br from-red-50 to-rose-100 border-2 border-red-500 rounded-vintage shadow-vintage">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2 bounce-in">😔</div>
                    <h3 className="font-headline text-2xl text-red-800 mb-2 fade-in-up">
                      The Fooqawhi Remain Lost...
                    </h3>
                    <p className="text-red-700 italic">
                      "The ancient guardians have eluded us this time, but their mystery endures."
                    </p>
                  </div>
                  
                  <div className="bg-white/70 p-4 rounded-vintage mb-4">
                    <h4 className="font-semibold text-vintage-dark text-lg mb-2">📍 Location That Eluded Us</h4>
                    <div className="space-y-2">
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Place:</span> {gameStatus.currentPlace.name}
                      </p>
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Country:</span> {gameStatus.currentPlace.country}
                      </p>
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Feature:</span> {gameStatus.currentPlace.feature}
                      </p>
                      <p className="text-vintage-dark">
                        <span className="font-semibold">Coordinates:</span> {gameStatus.currentPlace.latitude.toFixed(4)}°N, {gameStatus.currentPlace.longitude.toFixed(4)}°E
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 p-4 rounded-vintage mb-4">
                    <h4 className="font-semibold text-vintage-dark text-lg mb-2">📊 Quest Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Time:</span> {gameStatus.gameTime}
                      </div>
                      <div>
                        <span className="font-semibold">Hints Used:</span> {gameStatus.hintsUsed}/{gameStatus.totalHints}
                      </div>
                      <div>
                        <span className="font-semibold">Guesses Made:</span> {gameStatus.guessesMade}/{gameStatus.maxGuesses}
                      </div>
                      <div>
                        <span className="font-semibold">Hint Efficiency:</span> {Math.round((gameStatus.hintsUsed / gameStatus.totalHints) * 100)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-vintage mb-4 border border-yellow-300">
                    <p className="text-yellow-800 text-sm text-center">
                      💡 <strong>Tip:</strong> Study the hints more carefully and consider the geographical context of the clues.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="vintage-button bg-red-600 hover:bg-red-700 text-white px-6 py-2 mr-3"
                    >
                      🔄 Try Again
                    </button>
                    <button
                      onClick={onBackToLanding}
                      className="vintage-button bg-vintage-dark hover:bg-vintage-darker text-white px-6 py-2"
                    >
                      📚 Back to Lore
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  export default GamePage;
