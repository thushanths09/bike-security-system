import React, { useEffect, useState } from "react";
import { ref, onChildAdded } from "firebase/database";
import { db } from "../firebase";

export default function AlertsList({ onBikeAlert }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    onChildAdded(alertsRef, (snapshot) => {
      const alert = snapshot.val();
      setAlerts((prev) => [alert, ...prev]);

      // Optional: play sound
      // const audio = new Audio("/alert.mp3"); 
      // audio.play();

      // Browser notification
      if (Notification.permission === "granted") {
        new Notification(`🚨 ${alert.bikeId} moved!`, {
          body: `Distance: ${alert.distance.toFixed(2)} m`,
        });
      }

      // Pass alert to parent for any extra logic
      if (onBikeAlert) onBikeAlert(alert);
    });
  }, [onBikeAlert]);

  return (
    <ul style={{ maxHeight: "300px", overflowY: "auto" }} className="alerts-list">
      {alerts.map((alert, index) => (
        <li key={index} style={{ padding: "5px", borderBottom: "1px solid #ddd" }}>
          🚨 {alert.bikeId} moved {alert.distance.toFixed(2)} m (radius {alert.radius} m)
        </li>
      ))}
    </ul>
  );
}
