# Decision Log

## Technology Stack Decisions

### Frontend Framework
**Decision**: React
**Date**: Current
**Rationale**: User preference for modern component-based architecture with good ecosystem support

### Styling Framework
**Decision**: Tailwind CSS with custom 1930s theme
**Date**: Current
**Rationale**: Rapid development with utility classes while maintaining ability to create vintage aesthetic through custom colors, fonts, and components

### Map Implementation
**Decision**: Leaflet with react-leaflet
**Date**: Current
**Rationale**: Lightweight and fast, excellent for custom styling and vintage themes, good React integration, easy to create sepia-toned maps, perfect for Mercator projection customization, and free/open source

### Design Approach
**Decision**: Responsive design with 1930s travel newsreel aesthetic
**Date**: Current
**Rationale**: Modern accessibility requirements while maintaining vintage theme

### Location Validation System
**Decision**: Google Geocoding API integration
**Date**: Current
**Rationale**: 
- Provides accurate real-world location validation
- Enables precise distance calculation between coordinates
- Supports direction-based feedback for better user experience
- Handles international locations and various naming conventions
- Free tier provides sufficient requests for development and testing
**Implementation Details**:
- Uses Haversine formula for distance calculation
- Implements compass bearing calculation for directional feedback
- 50km threshold for correct guess validation
- Async validation with loading states and error handling

### Backend Integration
**Decision**: RESTful API integration with Google Geocoding API
**Date**: Current
**Implementation**: 
- Integrated Google Geocoding API for real-time location validation
- Distance-based guess validation using Haversine formula
- Direction-based feedback system
- Async guess submission with loading states
**Assumptions**:
- `/api/location` - Get current day's location
- `/api/guess` - Submit guess and get feedback
- `/api/hints` - Get next hint
- `/api/game-state` - Get current game state
- `/api/lore` - Get Fooqawhi lore content

## Implementation Strategy
1. ✅ Start with basic React setup and Tailwind configuration
2. ✅ Create custom 1930s theme with sepia tones and vintage fonts
3. ✅ Build landing page with lore and game information
4. ✅ Implement game page with map component
5. ✅ Add responsive design considerations
6. ✅ Integrate Google Geocoding API for location validation
7. ✅ Implement distance-based guess validation and feedback
8. ✅ Add comprehensive end-game functionality with achievements
9. ✅ Create hint system with travel record fragments
10. 🔄 Integrate with assumed REST API endpoints (future enhancement)

## Completed Features
- **Core Game Logic**: Complete game state management with hint progression
- **Interactive Map**: Leaflet-based world map with zoom and marker functionality
- **Location Validation**: Google Geocoding API integration with distance calculation
- **User Feedback**: Direction-based feedback system with distance indicators
- **End-Game Experience**: Victory/defeat screens with performance metrics and achievements
- **Vintage Aesthetic**: 1930s travel newsreel theme with custom animations
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Error Handling**: Comprehensive error handling for API failures and invalid inputs

## Technical Architecture Decisions

### State Management
**Decision**: React hooks (useState, useEffect) with service layer
**Rationale**: Simple state management for single-page application, service layer provides clean separation of concerns

### API Integration
**Decision**: Axios for HTTP requests with async/await pattern
**Rationale**: Modern promise-based HTTP client with good error handling and request/response interceptors

### Configuration Management
**Decision**: Environment variables with fallback configuration
**Rationale**: Secure API key management with development-friendly defaults

### Error Handling Strategy
**Decision**: Try-catch blocks with user-friendly error messages
**Rationale**: Graceful degradation when external services are unavailable, maintains game functionality

### Performance Considerations
**Decision**: Async operations with loading states
**Rationale**: Non-blocking UI during API calls, better user experience with visual feedback
