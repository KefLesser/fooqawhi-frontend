# Google Maps API Setup Instructions

This application uses the Google Geocoding API to validate user guesses and provide accurate distance-based feedback. Follow these steps to set up the API:

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

## 2. Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable the following APIs:
   - **Geocoding API** (required for location validation)
   - **Maps JavaScript API** (optional, for future Google Maps integration)

## 3. Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to specific APIs and domains for security

## 4. Configure the Application

1. Create a `.env` file in the project root:
   ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. Replace `your_api_key_here` with your actual API key

3. Restart the development server:
   ```bash
   npm start
   ```

## 5. Test the Integration

1. Start the game and make a guess
2. The application should now:
   - Validate your location using Google's geocoding service
   - Calculate the exact distance to the target location
   - Provide direction-based feedback (e.g., "Head northeast to find the Fooqawhi")

## API Usage and Costs

- The Geocoding API has a free tier with 40,000 requests per month
- Each guess validation counts as 1 API request
- For development, this should be more than sufficient
- Monitor your usage in the Google Cloud Console

## Troubleshooting

### "Geocoding service unavailable" error
- Check that your API key is correct
- Verify that the Geocoding API is enabled
- Check your API key restrictions

### "No results found" error
- The location name might be misspelled
- Try using more specific location names
- Some very small or obscure locations might not be in Google's database

### CORS errors
- Make sure you're running the app on localhost:3000
- Check that your API key doesn't have domain restrictions that block localhost

## Security Notes

- Never commit your API key to version control
- Use environment variables to store the API key
- Consider restricting your API key to specific domains in production
- Monitor your API usage regularly
