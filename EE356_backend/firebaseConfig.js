// firebaseConfig.js
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBdgTiqlNjbB3pBlOreIWVYTgl9gYrjo8g",
  authDomain: "bike-security-80211.firebaseapp.com",
  databaseURL: "https://bike-security-80211-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bike-security-80211",
  storageBucket: "bike-security-80211.firebasestorage.app",
  messagingSenderId: "335045435703",
  appId: "1:335045435703:web:7930a11518dc4a2cb43ab2",
  measurementId: "G-REC9HCWDQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = db;
