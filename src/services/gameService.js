import { placesData } from '../data/places.js';
import axios from 'axios';
import { API_CONFIG } from '../config/api.js';

// Game state management
class GameService {
  constructor() {
    this.currentPlace = placesData.places[0]; // Use Matera for testing
    this.currentHintIndex = 0;
    this.hintsGiven = "";
    this.guesses = [];
    this.gameState = 'playing'; // 'playing', 'won', 'lost'
    this.startTime = Date.now();
    this.achievements = [];
    
    // Google Geocoding API configuration
    this.geocodingApiKey = API_CONFIG.GOOGLE_MAPS_API_KEY;
    this.geocodingBaseUrl = API_CONFIG.GEOCODING_BASE_URL;
  }

  // Get current hint
  getCurrentHint() {
    let currentHint = null;
    if (this.currentHintIndex < this.currentPlace.sarcastic_descriptions.length) {
      currentHint = {
        hintNumber: this.currentHintIndex + 1,
        text: this.currentPlace.sarcastic_descriptions[this.currentHintIndex],
        isLastHint: this.currentHintIndex === this.currentPlace.sarcastic_descriptions.length - 1
      };
      return currentHint;
    }
    return null;
  }

  // Get next hint
  getNextHint() {
    this.hintsGiven = this.hintsGiven + this.currentPlace.sarcastic_descriptions[this.currentHintIndex]
    
    // .push({
    //   id: this.currentHintIndex + 1, 
    //   text: this.currentPlace.sarcastic_descriptions[this.currentHintIndex] 
    // })
    if (this.currentHintIndex < this.currentPlace.sarcastic_descriptions.length - 1) {
      this.currentHintIndex++;
      return this.getCurrentHint();
    }
    return null;
  }

  // Geocode a location using Google Geocoding API
  async geocodeLocation(location, country) {
    try {
      const query = `${location}, ${country}`;
      const response = await axios.get(this.geocodingBaseUrl, {
        params: {
          address: query,
          key: this.geocodingApiKey
        }
      });

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const result = response.data.results[0];
        const location = result.geometry.location;
        
        return {
          success: true,
          latitude: location.lat,
          longitude: location.lng,
          formattedAddress: result.formatted_address,
          placeId: result.place_id,
          addressComponents: result.address_components
        };
      } else {
        return {
          success: false,
          error: response.data.status || 'No results found'
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return {
        success: false,
        error: 'Geocoding service unavailable'
      };
    }
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Calculate bearing between two points
  calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = this.toRadians(lon2 - lon1);
    const lat1Rad = this.toRadians(lat1);
    const lat2Rad = this.toRadians(lat2);
    
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180 / Math.PI + 360) % 360;
    return bearing

    // const y = Math.sin(lon2-lon1) * Math.cos(lat2);
    // const x = Math.cos(lat1)*Math.sin(lat2) -
    //       Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);
    // const z = Math.atan2(y, x);
    // const brng = (z*180/Math.PI + 360) % 360; // in degrees
    // console.log({brng});
    // return brng;
  }

  // Get direction from bearing
  getDirection(bearing) {
    console.log({bearing});
    const directions = [
      'north', 'north-northeast', 'northeast', 'east-northeast',
      'east', 'east-southeast', 'southeast', 'south-southeast',
      'south', 'south-southwest', 'southwest', 'west-southwest',
      'west', 'west-northwest', 'northwest', 'north-northwest'
    ];
    
    const index = Math.round(bearing / 22.5) % 16;
    console.log({index});
    console.log(directions[index]);
    return directions[index];
  }

  // Check if guess is correct based on distance threshold
  isGuessCorrect(guessLat, guessLon, targetLat, targetLon, thresholdKm = API_CONFIG.CORRECT_GUESS_THRESHOLD_KM) {
    const distance = this.calculateDistance(guessLat, guessLon, targetLat, targetLon);
    return distance <= thresholdKm;
  }

  // Submit a guess with geocoding validation
  async submitGuess(guess) {
    // First, geocode the guessed location
    const geocodeResult = await this.geocodeLocation(guess.location, guess.country);
    
    if (!geocodeResult.success) {
      return {
        id: Date.now(),
        location: guess.location,
        country: guess.country,
        timestamp: new Date(),
        isCorrect: false,
        error: geocodeResult.error,
        distance: null,
        geocodedLocation: null
      };
    }

    // Calculate distance to target location
    const distance = this.calculateDistance(
      geocodeResult.latitude,
      geocodeResult.longitude,
      this.currentPlace.latitude,
      this.currentPlace.longitude
    );

    // Calculate bearing and direction
    const bearing = this.calculateBearing(
      geocodeResult.latitude,
      geocodeResult.longitude,
      this.currentPlace.latitude,
      this.currentPlace.longitude
    );
    const direction = this.getDirection(bearing);
    console.log({direction});

    // Check if guess is correct (within threshold)
    const isCorrect = this.isGuessCorrect(
      geocodeResult.latitude,
      geocodeResult.longitude,
      this.currentPlace.latitude,
      this.currentPlace.longitude
    );

    const guessData = {
      id: Date.now(),
      location: guess.location,
      country: guess.country,
      timestamp: new Date(),
      isCorrect: isCorrect,
      distance: Math.round(distance),
      direction: direction,
      bearing: Math.round(bearing),
      geocodedLocation: {
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
        formattedAddress: geocodeResult.formattedAddress
      }
    };

    console.log(geocodeResult)
    this.guessResult = geocodeResult;

    this.guesses.push(guessData);

    if (guessData.isCorrect) {
      this.gameState = 'won';
      this.checkAchievements(); // Check achievements on win
    } else if (this.guesses.length >= 5) {
      this.gameState = 'lost';
    }

    return guessData;
  }

  // Get game status
  getGameStatus() {
    const gameTime = Date.now() - this.startTime;
    const minutes = Math.floor(gameTime / 60000);
    const seconds = Math.floor((gameTime % 60000) / 1000);
    
    return {
      currentHint: this.getCurrentHint(),
      hintsGiven: this.hintsGiven,
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
    this.hintsGiven = "";
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

    console.log("geocoderesult", this.guessResult )
    return {
      center:[this.guessResult?.latitude | this.currentPlace.latitude, 
        this.guessResult?.longitude | this.currentPlace.longitude],
      zoom: currentZoom
    };
  }

  // Get feedback for incorrect guess
  getGuessFeedback(guess) {
    const distance = this.calculateDistance(guess);
    const direction = this.getDirection(guess);
    console.log({distance, direction});
    
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
}

// Create singleton instance
const gameService = new GameService();

export default gameService;
