import React from 'react';

const LandingPage = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-vintage-cream">
      <header className="vintage-header">
        <div className="container mx-auto px-4">
          <h1 className="text-center uppercase tracking-wider animate-fade-in">
            Fooqawhi
          </h1>
          <p className="text-center mt-2 font-vintage text-xl animate-slide-up">
            Where the Fooqawhi?
          </p>
          <div className="text-center mt-4">
            <span className="vintage-badge">Adventure Awaits</span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="vintage-card max-w-6xl mx-auto animate-fade-in mb-12">
          <h2 className="text-center mb-8">
            Welcome to the Adventure
          </h2>
          
          <div className="vintage-divider"></div>
          
          <div className="vintage-text space-y-6">
            <div className="vintage-highlight">
              <p className="font-semibold text-lg">
                The Fooqawhi are a mysterious, ancient people who travel the earth in search of clues to their origins.
              </p>
            </div>
            
            <p>
              They often find themselves lost in unexpected places, and wherever they go, they ask the same question: 
              <span className="vintage-quote">Where the Fooqawhi?</span>
            </p>
            
            <p>
              These primitive travelers do not speak much of any language, but they possess an uncanny ability to find themselves 
              in the most remarkable locations around the globe. Their journey is one of discovery, mystery, and adventure.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Lore */}
          <div className="vintage-card animate-slide-up">
            <h3 className="text-center mb-6">
              The Legend of the Fooqawhi
            </h3>
            
            <div className="vintage-text space-y-4">
              <p>
                The Fooqawhi are a fictional, ancient people of unknown origin. Their history is shrouded in mystery, 
                and their origins remain one of the greatest enigmas of our time.
              </p>
              
              <p>
                These primitive beings travel the earth in search of clues to their origins, often finding themselves 
                in the most unexpected and remarkable places. Their journey is one of constant discovery and wonder.
              </p>
              
              <div className="bg-vintage-aged p-4 rounded-vintage border border-vintage-brown">
                <p className="italic text-vintage-brown">
                  "The Fooqawhi do not speak much of any language, but wherever they find themselves they ask the same question: 
                  <strong> Where the Fooqawhi?</strong>"
                </p>
              </div>
              
              <p>
                As primitive beings, they do not have references to modern technology (20th century and beyond), 
                so they always speak in less technical and more descriptive terms, making their communications 
                both charming and mysterious.
              </p>
            </div>
          </div>

          {/* Right Column - How to Play */}
          <div className="vintage-card animate-slide-up">
            <h3 className="text-center mb-6">
              How to Play
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <span className="vintage-badge flex-shrink-0">1</span>
                <div>
                  <h4 className="font-semibold text-vintage-dark mb-2">Receive Hints</h4>
                  <p className="vintage-text text-sm">
                    You'll receive up to 5 hints about the Fooqawhi's current location. Each hint will help you narrow down their whereabouts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="vintage-badge flex-shrink-0">2</span>
                <div>
                  <h4 className="font-semibold text-vintage-dark mb-2">Watch the Map</h4>
                  <p className="vintage-text text-sm">
                    With each hint, the map will zoom closer to their location, giving you visual clues about their journey.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="vintage-badge flex-shrink-0">3</span>
                <div>
                  <h4 className="font-semibold text-vintage-dark mb-2">Make Your Guess</h4>
                  <p className="vintage-text text-sm">
                    Submit your guess about where the Fooqawhi are located, or ask for another hint to get closer to the answer.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <span className="vintage-badge flex-shrink-0">4</span>
                <div>
                  <h4 className="font-semibold text-vintage-dark mb-2">Help Them Home</h4>
                  <p className="vintage-text text-sm">
                    Once you find the Fooqawhi, you'll learn about their amazing location and help them continue their journey!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="vintage-card max-w-6xl mx-auto mt-12 animate-fade-in">
          <h3 className="text-center mb-8">
            What Makes This Adventure Special
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="vintage-badge mb-4">🗺️</div>
              <h4 className="font-semibold text-vintage-dark mb-2">Interactive World Map</h4>
              <p className="vintage-text text-sm">
                Explore a beautiful sepia-toned world map that zooms closer with each hint, 
                creating an immersive adventure experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="vintage-badge mb-4">🎭</div>
              <h4 className="font-semibold text-vintage-dark mb-2">1930s Aesthetic</h4>
              <p className="vintage-text text-sm">
                Experience the golden age of adventure with our authentic 1930s travel newsreel 
                design inspired by classic explorers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="vintage-badge mb-4">🧭</div>
              <h4 className="font-semibold text-vintage-dark mb-2">Daily Adventures</h4>
              <p className="vintage-text text-sm">
                Each day brings a new location and a new mystery to solve. 
                Help the Fooqawhi discover amazing places around the world.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="vintage-card max-w-2xl mx-auto">
            <h3 className="mb-6">Ready to Begin Your Quest?</h3>
            <p className="vintage-text mb-8">
              Join the Fooqawhi on their journey of discovery. Each adventure is unique, 
              and every location holds its own secrets waiting to be uncovered.
            </p>
            <button 
              onClick={onStartGame}
              className="vintage-button text-lg px-12 py-5"
            >
              Begin the Quest
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
