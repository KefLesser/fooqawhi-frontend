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

### Backend Integration
**Decision**: RESTful API integration
**Date**: Current
**Assumptions**:
- `/api/location` - Get current day's location
- `/api/guess` - Submit guess and get feedback
- `/api/hints` - Get next hint
- `/api/game-state` - Get current game state
- `/api/lore` - Get Fooqawhi lore content

## Implementation Strategy
1. Start with basic React setup and Tailwind configuration
2. Create custom 1930s theme with sepia tones and vintage fonts
3. Build landing page with lore and game information
4. Implement game page with map component
5. Add responsive design considerations
6. Integrate with assumed REST API endpoints
