// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/modern.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar glass">
      <h1>🛡️ Bike Safety</h1>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
        <Link to="/simulator" className={location.pathname === "/simulator" ? "active" : ""}>Simulator</Link>
      </div>
    </nav>
  );
}
