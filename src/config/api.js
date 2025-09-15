// API Configuration
export const API_CONFIG = {
  // Google Maps API Key for Geocoding
  // Get your API key from: https://console.cloud.google.com/google/maps-apis
  // Make sure to enable the Geocoding API for your project
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDcPB5by6cbYEEaM4R4JQFbjRb3FEd-Js0',
  
  // Geocoding API endpoint
  GEOCODING_BASE_URL: 'https://maps.googleapis.com/maps/api/geocode/json',
  
  // Distance threshold for correct guesses (in kilometers)
  CORRECT_GUESS_THRESHOLD_KM: 50
};

// Instructions for setting up the API key:
// 1. Go to https://console.cloud.google.com/google/maps-apis
// 2. Create a new project or select an existing one
// 3. Enable the "Geocoding API" for your project
// 4. Create credentials (API Key)
// 5. Copy the API key and set it as REACT_APP_GOOGLE_MAPS_API_KEY in your .env file
// 6. Restart your development server
