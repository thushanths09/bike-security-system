// Redesigned Leaflet Geofence Simulator with modern UI and responsive styling + enhancements
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const center = [7.2906, 80.6337];
const parkingLocation = [7.2906, 80.6337];

function MoveBike({ bikeLocation, setBikeLocation }) {
  const map = useMap();
  const moveBike = () => {
    const newLocation = [
      bikeLocation[0] + (Math.random() - 0.5) / 1000,
      bikeLocation[1] + (Math.random() - 0.5) / 1000,
    ];
    setBikeLocation(newLocation);
    map.setView(newLocation);
  };

  useEffect(() => {
    const button = document.getElementById("simulate-btn");
    if (button) {
      button.onclick = moveBike;
    }
  }, [bikeLocation]);

  return null;
}

function BikeGeofence() {
  const [radius, setRadius] = useState(50);
  const [bikeLocation, setBikeLocation] = useState(center);

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distance = getDistance(
    parkingLocation[0],
    parkingLocation[1],
    bikeLocation[0],
    bikeLocation[1]
  );
  const outside = distance > radius;

  return (
    <div className="glass simulator-wrapper">
      <h2 className="sim-title">🚲 Geofence Simulator</h2>

      <div className="sim-controls">
        <div className="slider-container">
          <label htmlFor="radius" className="sim-label">
            Geofence Radius:
          </label>
          <input
            id="radius"
            type="range"
            min="10"
            max="500"
            step="5"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <span className="radius-value">{radius} meters</span>
        </div>

        <button id="simulate-btn" className="sim-button">
          🚴 Simulate Bike Move
        </button>
      </div>

      <p className={`sim-status ${outside ? "outside" : "inside"}`}>
        {outside ? "⚠️ Bike is outside geofence!" : "✅ Bike is inside geofence"}
      </p>

      <MapContainer
        center={center}
        zoom={16}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <Marker position={bikeLocation}>
          <Popup>🚴 Bike Location</Popup>
        </Marker>
        <Circle
          center={parkingLocation}
          radius={radius}
          pathOptions={{
            color: outside ? "#FF4D4D" : "#3DF09B",
            fillOpacity: 0.3,
          }}
        />
        <MoveBike bikeLocation={bikeLocation} setBikeLocation={setBikeLocation} />
      </MapContainer>

      <footer className="sim-footer">
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "#ccc" }}>
          Built with ❤️ for the IoT-Based Bike Safety Project — Exhibition 2025
        </p>
      </footer>
    </div>
  );
}

export default BikeGeofence;
