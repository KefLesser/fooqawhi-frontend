import { placesData } from '../data/places.js';

// Game state management
class GameService {
  constructor() {
    this.currentPlace = placesData.places[0]; // Use Matera for testing
    this.currentHintIndex = 0;
    this.guesses = [];
    this.gameState = 'playing'; // 'playing', 'won', 'lost'
    this.startTime = Date.now();
    this.achievements = [];
  }

  // Get current hint
  getCurrentHint() {
    if (this.currentHintIndex < this.currentPlace.sarcastic_descriptions.length) {
      return {
        hintNumber: this.currentHintIndex + 1,
        text: this.currentPlace.sarcastic_descriptions[this.currentHintIndex],
        isLastHint: this.currentHintIndex === this.currentPlace.sarcastic_descriptions.length - 1
      };
    }
    return null;
  }

  // Get next hint
  getNextHint() {
    if (this.currentHintIndex < this.currentPlace.sarcastic_descriptions.length - 1) {
      this.currentHintIndex++;
      return this.getCurrentHint();
    }
    return null;
  }

  // Submit a guess
  submitGuess(guess) {
    const guessData = {
      id: Date.now(),
      location: guess.location,
      country: guess.country,
      timestamp: new Date(),
      isCorrect: this.checkGuess(guess)
    };

    this.guesses.push(guessData);

    if (guessData.isCorrect) {
      this.gameState = 'won';
      this.checkAchievements(); // Check achievements on win
    } else if (this.guesses.length >= 5) {
      this.gameState = 'lost';
    }

    return guessData;
  }

  // Check if guess is correct
  checkGuess(guess) {
    const locationMatch = guess.location.toLowerCase().includes(this.currentPlace.name.toLowerCase());
    const countryMatch = guess.country.toLowerCase().includes(this.currentPlace.country.toLowerCase());
    return locationMatch && countryMatch;
  }

  // Get game status
  getGameStatus() {
    const gameTime = Date.now() - this.startTime;
    const minutes = Math.floor(gameTime / 60000);
    const seconds = Math.floor((gameTime % 60000) / 1000);
    
    return {
      currentHint: this.getCurrentHint(),
      hintsUsed: this.currentHintIndex + 1,
      totalHints: this.currentPlace.sarcastic_descriptions.length,
      guessesMade: this.guesses.length,
      maxGuesses: 5,
      gameState: this.gameState,
      currentPlace: this.currentPlace,
      guesses: this.guesses,
      gameTime: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      achievements: this.achievements
    };
  }

  // Check and award achievements
  checkAchievements() {
    const newAchievements = [];
    
    // Speed achievements
    const gameTime = Date.now() - this.startTime;
    if (gameTime < 60000 && this.gameState === 'won') { // Under 1 minute
      newAchievements.push({
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Found the Fooqawhi in under 1 minute!',
        icon: '⚡'
      });
    }
    
    // Efficiency achievements
    const hintEfficiency = (this.currentHintIndex + 1) / this.currentPlace.sarcastic_descriptions.length;
    if (hintEfficiency <= 0.5 && this.gameState === 'won') { // Used 50% or fewer hints
      newAchievements.push({
        id: 'hint_master',
        title: 'Hint Master',
        description: 'Solved with 50% or fewer hints!',
        icon: '🧠'
      });
    }
    
    // Accuracy achievements
    if (this.guesses.length === 1 && this.gameState === 'won') { // First guess correct
      newAchievements.push({
        id: 'first_guess',
        title: 'First Guess Wonder',
        description: 'Found the Fooqawhi on your first try!',
        icon: '🎯'
      });
    }
    
    // Add new achievements
    newAchievements.forEach(achievement => {
      if (!this.achievements.find(a => a.id === achievement.id)) {
        this.achievements.push(achievement);
      }
    });
    
    return newAchievements;
  }

  // Reset game
  resetGame() {
    this.currentHintIndex = 0;
    this.guesses = [];
    this.gameState = 'playing';
    this.startTime = Date.now();
    this.achievements = [];
  }

  // Get map center and zoom based on hint level
  getMapView() {
    const baseZoom = 2;
    const zoomIncrement = 1;
    const currentZoom = Math.min(baseZoom + (this.currentHintIndex * zoomIncrement), 8);
    
    return {
      center: [this.currentPlace.latitude, this.currentPlace.longitude],
      zoom: currentZoom
    };
  }

  // Get feedback for incorrect guess
  getGuessFeedback(guess) {
    const distance = this.calculateDistance(guess);
    const direction = this.getDirection(guess);
    
    if (distance < 100) {
      return "You're very close! The Fooqawhi are practically within shouting distance.";
    } else if (distance < 500) {
      return `You're getting warmer! The Fooqawhi are about ${Math.round(distance)}km ${direction} from your guess.`;
    } else if (distance < 1000) {
      return `Not quite there yet. The Fooqawhi are approximately ${Math.round(distance)}km ${direction} from your guess.`;
    } else {
      return `The Fooqawhi are quite far from your guess - about ${Math.round(distance)}km ${direction}.`;
    }
  }

  // Calculate approximate distance (simplified)
  calculateDistance(guess) {
    // This is a simplified distance calculation
    // In a real app, you'd use proper geocoding and distance calculation
    const latDiff = Math.abs(this.currentPlace.latitude - (guess.latitude || 0));
    const lonDiff = Math.abs(this.currentPlace.longitude - (guess.longitude || 0));
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111; // Rough km conversion
  }

  // Get direction from guess to actual location
  getDirection(guess) {
    // Simplified direction calculation
    const latDiff = this.currentPlace.latitude - (guess.latitude || 0);
    const lonDiff = this.currentPlace.longitude - (guess.longitude || 0);
    
    if (Math.abs(latDiff) > Math.abs(lonDiff)) {
      return latDiff > 0 ? 'north' : 'south';
    } else {
      return lonDiff > 0 ? 'east' : 'west';
    }
  }
}

// Create singleton instance
const gameService = new GameService();

export default gameService;
