import React, { useEffect, useRef } from "react";
import BikeMap from "./components/BikeMap";
import AlertsList from "./components/AlertsList";
// import BikeGeofence from './components/BikeGeofence';

function App() {
  const mapRef = useRef();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Bike Security Dashboard</h1>
      <BikeMap ref={mapRef} />
      <h2>Alerts</h2>
      <AlertsList onBikeAlert={(alert) => {
        console.log("Alert received for", alert.bikeId);
      }} />
    {/* <div style={{ height: '100vh', width: '100%' }}>
      <BikeGeofence />
    </div> */}
    </div>
  );
}

export default App;
