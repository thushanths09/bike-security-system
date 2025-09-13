// src/components/BikeGeofence.js
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 7.2906, // Default latitude (example: Kandy)
  lng: 80.6337, // Default longitude
};

const parkingLocation = {
  lat: 7.2906,
  lng: 80.6337,
};

function BikeGeofence() {
  const [radius, setRadius] = useState(50); // default radius in meters
  const [bikeLocation, setBikeLocation] = useState(center);

  // Example: Function to simulate bike moving
  const moveBike = () => {
    setBikeLocation({
      lat: bikeLocation.lat + (Math.random() - 0.5) / 1000,
      lng: bikeLocation.lng + (Math.random() - 0.5) / 1000,
    });
  };

  // Check if bike is outside geofence
  const isOutsideGeofence = window.google
    ? window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(bikeLocation.lat, bikeLocation.lng),
        new window.google.maps.LatLng(parkingLocation.lat, parkingLocation.lng)
      ) > radius
    : false;

  return (
    <div>
      <h2>Bike Geofence</h2>
      <label>
        Geofence Radius: {radius} meters
        <input
          type="range"
          min="10"
          max="500"
          step="5"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </label>

      <button onClick={moveBike}>Simulate Bike Move</button>
      <p>{isOutsideGeofence ? "⚠️ Bike is outside geofence!" : "✅ Bike is inside geofence"}</p>

      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["geometry"]}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
          <Marker position={bikeLocation} />
          <Circle
            center={parkingLocation}
            radius={radius}
            options={{
              fillColor: "#FF0000",
              fillOpacity: 0.2,
              strokeColor: "#FF0000",
              strokeOpacity: 0.7,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default BikeGeofence;
