// src/components/Home.js
import React from "react";
import "../styles/modern.css";

export default function Home() {
  return (
    <div className="glass page-content">
      <h2>🚴‍♂️ IoT-Based Bike Safety & Anti-Theft System</h2>
      <p>
        This smart system integrates embedded sensors, geofencing, and real-time
        alerts to enhance bike safety and protect against theft.
      </p>

      <div className="glass" style={{ padding: "1rem", marginTop: "2rem" }}>
        <h3>🔧 Modules Overview</h3>
        <ul>
          <li><strong>Slave 1:</strong> Alcohol detection using MQ3 + DHT22 + ESP32</li>
          <li><strong>Master:</strong> Crash detection, GPS tracking, geofencing, and SMS alerts</li>
          <li><strong>Slave 2:</strong> Relay-based ignition blocking with override logic</li>
        </ul>
      </div>

      <div className="glass" style={{ padding: "1rem", marginTop: "2rem" }}>
        <h3>📲 Dashboard Features</h3>
        <ul>
          <li>Live GPS tracking of bike(s)</li>
          <li>Geofence violation detection with alerts</li>
          <li>Real-time browser notifications and sound</li>
          <li>Movement trail visualization</li>
          <li>Geofence simulator for testing</li>
        </ul>
      </div>

      <p style={{ marginTop: "2rem", textAlign: "center" }}>
        🔍 Navigate to the <strong>Dashboard</strong> or <strong>Simulator</strong> to explore the live system.
      </p>
    </div>
  );
}
