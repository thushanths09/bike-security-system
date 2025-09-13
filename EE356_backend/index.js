const db = require("./firebaseConfig");
const { ref, onValue, push } = require("firebase/database");
const { getDistance } = require("./utils");

// Example parked locations
const parkedLocations = {
  bike1: { lat: 7.291, lng: 80.635 },
  bike2: { lat: 7.292, lng: 80.636 }
};

// Function to send alert
function sendAlert(bikeId, distance, radius) {
  console.log(`🚨 ALERT! ${bikeId} moved outside geofence.`);
  console.log(`Distance: ${distance.toFixed(2)} m | Radius: ${radius} m`);

  // Store alert in Firebase
  const alertRef = ref(db, `alerts`);
  push(alertRef, {
    bikeId,
    distance,
    radius,
    timestamp: Date.now()
  });
}

// Monitor all bikes
const bikesRef = ref(db, 'bikes');

onValue(bikesRef, (snapshot) => {
  const bikes = snapshot.val();
  if (!bikes) return;

  for (const bikeId in bikes) {
    const bike = bikes[bikeId];
    const parked = parkedLocations[bikeId] || { lat: bike.lat, lng: bike.lng };
    const distance = getDistance(parked.lat, parked.lng, bike.lat, bike.lng);

    console.log(`Bike: ${bikeId} | Distance: ${distance.toFixed(2)} m`);

    if (distance > bike.geofenceRadius) {
      sendAlert(bikeId, distance, bike.geofenceRadius);
    }
  }
});
