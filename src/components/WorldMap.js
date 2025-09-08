import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom vintage marker icon
const createVintageMarker = () => {
  return L.divIcon({
    className: 'vintage-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: #8b7355;
        border: 2px solid #3d2914;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(61, 41, 20, 0.3);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #b8860b;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to handle map updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom !== undefined) {
      map.setView(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, map]);
  
  return null;
};

const WorldMap = ({ 
  center = [20, 0], 
  zoom = 2, 
  markers = [], 
  onMapClick,
  className = "h-96 w-full"
}) => {
  const mapRef = useRef();

  // Custom tile layer for vintage styling
  const VintageTileLayer = () => (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      className="vintage-tiles"
    />
  );

  return (
    <div className={`vintage-map-container ${className}`}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="vintage-map"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
        boxZoom={true}
        keyboard={true}
        attributionControl={false}
      >
        <VintageTileLayer />
        
        <MapUpdater center={center} zoom={zoom} />
        
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={marker.icon || createVintageMarker()}
          >
            {marker.popup && (
              <Popup>
                <div className="vintage-popup">
                  <h4 className="font-headline text-vintage-dark mb-2">
                    {marker.popup.title}
                  </h4>
                  <p className="vintage-text text-sm">
                    {marker.popup.content}
                  </p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
