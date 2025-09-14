// src/components/Dashboard.js
import React from "react";
import BikeMap from "./BikeMap";
import AlertsList from "./AlertsList";
import "../styles/modern.css";

export default function Dashboard() {
  return (
    <div className="glass page-content">
      <h2>📍 Live Tracking Dashboard</h2>

      <div className="glass" style={{ marginBottom: "2rem" }}>
        <BikeMap />
      </div>

      <div className="glass">
        <h3>🚨 Movement Alerts</h3>
        <AlertsList />
      </div>
    </div>
  );
}
