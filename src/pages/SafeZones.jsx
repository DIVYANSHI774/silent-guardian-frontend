import React, { useState, useEffect } from "react";

const SafeZones = () => {
  const [zones, setZones] = useState([]);
  const [zone, setZone] = useState({ name: "", lat: "", lng: "", radius: 300 });

  // 🧠 Load zones from localStorage when page loads
  useEffect(() => {
    const savedZones = JSON.parse(localStorage.getItem("safeZones")) || [];
    setZones(savedZones);
  }, []);

  // 💾 Save zones to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("safeZones", JSON.stringify(zones));
  }, [zones]);

  // ➕ Add new zone
  const addZone = () => {
    if (!zone.name || !zone.lat || !zone.lng) {
      alert("Please fill all fields before adding a zone!");
      return;
    }

    setZones([...zones, zone]);
    setZone({ name: "", lat: "", lng: "", radius: 300 });
  };

  // ❌ Remove zone
  const removeZone = (index) => {
    const updated = zones.filter((_, i) => i !== index);
    setZones(updated);
  };

  // 📍 Auto-fill coordinates using current location
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setZone({
          ...zone,
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        });
      },
      (err) => alert("Unable to fetch location: " + err.message)
    );
  };

  return (
    <div className="bg-black text-white flex flex-col items-center min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-red-500">🏠 Safe Zone Setup</h1>

      {/* Input fields */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-3">
        <input
          type="text"
          placeholder="Zone Name (Home, Office, etc.)"
          className="w-full p-2 text-black rounded"
          value={zone.name}
          onChange={(e) => setZone({ ...zone, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Latitude"
          className="w-full p-2 text-black rounded"
          value={zone.lat}
          onChange={(e) => setZone({ ...zone, lat: e.target.value })}
        />
        <input
          type="number"
          placeholder="Longitude"
          className="w-full p-2 text-black rounded"
          value={zone.lng}
          onChange={(e) => setZone({ ...zone, lng: e.target.value })}
        />
        <input
          type="number"
          placeholder="Radius (in meters)"
          className="w-full p-2 text-black rounded"
          value={zone.radius}
          onChange={(e) => setZone({ ...zone, radius: e.target.value })}
        />

        <div className="flex gap-3 mt-2">
          <button
            onClick={useCurrentLocation}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-1/2"
          >
            📍 Use My Location
          </button>
          <button
            onClick={addZone}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-1/2"
          >
            ➕ Add Zone
          </button>
        </div>
      </div>

      {/* Safe zones list */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Your Safe Zones:</h2>
        {zones.length === 0 ? (
          <p className="text-gray-400">No safe zones added yet.</p>
        ) : (
          <ul className="space-y-2">
            {zones.map((z, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <div>
                  <p className="font-bold">{z.name}</p>
                  <p className="text-sm text-gray-300">
                    📍 {z.lat}, {z.lng} | Radius: {z.radius}m
                  </p>
                </div>
                <button
                  onClick={() => removeZone(i)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SafeZones;
