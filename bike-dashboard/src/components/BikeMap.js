import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, Circle, InfoWindow, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

const mapContainerStyle = { width: "100%", height: "600px" };
const defaultCenter = { lat: 7.291, lng: 80.635 };

export default function BikeMap() {
  const [bikes, setBikes] = useState({});
  const [selectedBike, setSelectedBike] = useState(null);
  const mapRef = useRef();
  const { isLoaded } = useJsApiLoader({ 
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
  });

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  // Listen to Firebase bikes
  useEffect(() => {
    const bikesRef = ref(db, "bikes");
    onValue(bikesRef, (snapshot) => {
      setBikes(snapshot.val() || {});
    });
  }, []);

  // Auto-center map on bike outside geofence
  useEffect(() => {
    if (!mapRef.current) return;
    Object.keys(bikes).forEach((id) => {
      const bike = bikes[id];
      if (bike.distanceExceeded) {
        mapRef.current.panTo({ lat: bike.lat, lng: bike.lng });
        mapRef.current.setZoom(18);
      }
    });
  }, [bikes]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="map-container">
    <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={16} onLoad={handleMapLoad}>
      {Object.keys(bikes).map((id) => {
        const bike = bikes[id];
        const position = { lat: bike.lat, lng: bike.lng };
        const outsideGeofence = bike.distanceExceeded || false;
        const circleColor = outsideGeofence ? "#FF0000" : "#00FF00";

        // Prepare trail positions (last few points)
        const trailPositions = bike.trail
          ? Object.values(bike.trail).map(p => ({ lat: p.lat, lng: p.lng }))
          : [];

        return (
          <React.Fragment key={id}>
            {/* Marker */}
            <Marker
              position={position}
              title={id}
              onClick={() => setSelectedBike({ id, ...bike })}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: circleColor,
                fillOpacity: 1,
                strokeWeight: 1
              }}
            />

            {/* Geofence */}
            <Circle
              center={position}
              radius={bike.geofenceRadius || 5}
              options={{
                fillColor: circleColor,
                fillOpacity: 0.2,
                strokeColor: circleColor,
                strokeOpacity: 0.7
              }}
            />

            {/* Trail Polyline */}
            {trailPositions.length > 1 && (
              <Polyline
                path={trailPositions}
                options={{
                  strokeColor: circleColor,
                  strokeOpacity: 0.7,
                  strokeWeight: 3
                }}
              />
            )}
          </React.Fragment>
        );
      })}

      {/* InfoWindow */}
      {selectedBike && (
        <InfoWindow
          position={{ lat: selectedBike.lat, lng: selectedBike.lng }}
          onCloseClick={() => setSelectedBike(null)}
        >
          <div>
            <h3>{selectedBike.id}</h3>
            <p>Status: {selectedBike.status || "parked"}</p>
            <p>Geofence: {selectedBike.geofenceRadius} m</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    </div>
  );
}
