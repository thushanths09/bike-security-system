import React from "react";
import BikeGeofence from "./BikeGeofence";

export default function Simulator() {
  return (
    <div className="glass card" style={{ padding: "2rem" }}>
      <h2>Geofence Simulator</h2>
      <BikeGeofence />
    </div>
  );
}
