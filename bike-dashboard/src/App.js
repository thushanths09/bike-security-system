import React, { useEffect, useRef } from "react";
import BikeMap from "./components/BikeMap";
import AlertsList from "./components/AlertsList";
import "./App.css";

function App() {
  const mapRef = useRef();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Bike Security Dashboard</h1>

      <div className="glass-card">
        <BikeMap ref={mapRef} />
      </div>

      <div className="glass-card">
        <h2>Alerts</h2>
        <AlertsList
          onBikeAlert={(alert) => {
            console.log("Alert received for", alert.bikeId);
          }}
        />
      </div>
    </div>
  );
}

export default App;
