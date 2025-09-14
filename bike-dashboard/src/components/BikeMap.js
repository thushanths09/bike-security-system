// src/components/BikeMap.js
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, Polyline, Popup } from "react-leaflet";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

const defaultCenter = [7.291, 80.635]; // Kandy

export default function BikeMap() {
  const [bikes, setBikes] = useState({});
  const mapRef = useRef();

  // Fetch bike data from Firebase
  useEffect(() => {
    const bikesRef = ref(db, "bikes");
    onValue(bikesRef, (snapshot) => {
      setBikes(snapshot.val() || {});
    });
  }, []);

  // Pan to bikes that are outside geofence
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.keys(bikes).forEach((id) => {
      const bike = bikes[id];
      if (bike.distanceExceeded && bike.lat && bike.lng) {
        map.setView([bike.lat, bike.lng], 18);
      }
    });
  }, [bikes]);

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={16}
        style={{ height: "600px", width: "100%", borderRadius: "15px" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(bikes).map(([id, bike]) => {
          const position = [bike.lat, bike.lng];
          const color = bike.distanceExceeded ? "#FF0000" : "#00FF00";
          const trail = bike.trail
            ? Object.values(bike.trail).map((p) => [p.lat, p.lng])
            : [];

          return (
            <React.Fragment key={id}>
              <Marker position={position}>
                <Popup>
                  <strong>{id}</strong><br />
                  Status: {bike.status || "parked"}<br />
                  Geofence: {bike.geofenceRadius} m
                </Popup>
              </Marker>

              <Circle
                center={position}
                radius={bike.geofenceRadius || 5}
                pathOptions={{
                  color: color,
                  fillOpacity: 0.3,
                  weight: 2,
                }}
              />

              {trail.length > 1 && (
                <Polyline positions={trail} pathOptions={{ color }} />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
