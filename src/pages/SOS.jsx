import React from "react";
import { startEvidenceRecording } from "../pages/EvidenceRecorder"; // adjust path

// Backend URLhttps
const backendUrl = "https://silent-guardian-backend.onrender.com"; // <-- replace

// Clap detector
const useClapDetector = (onClap) => {
  React.useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let mic;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      mic.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);

      const detect = () => {
        analyser.getByteTimeDomainData(data);
        let highPeak = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i] > 250 || data[i] < 5) {
            highPeak = true;
            break;
          }
        }
        if (highPeak) onClap();
        requestAnimationFrame(detect);
      };
      detect();
    });

    return () => mic && mic.disconnect();
  }, [onClap]);
};

// Get location
const getCurrentLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (pos) => resolve(pos.coords),
    (err) => reject(err),
    { enableHighAccuracy: true }
  );
});

// Safe zone check
const isOutsideSafeZones = (lat, lng) => {
  const zones = JSON.parse(localStorage.getItem("safeZones")) || [];
  if (zones.length === 0) return true;

  const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  for (const z of zones) {
    const d = distance(lat, lng, z.lat, z.lng);
    if (d <= z.radius) return false;
  }
  return true;
};

// WhatsApp
const sendWhatsAppMessage = (phone, message) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// Trigger SOS
const triggerSOS = async () => {
  try {
    startEvidenceRecording();

    const loc = await getCurrentLocation();
    const { latitude, longitude } = loc;
    const outside = isOutsideSafeZones(latitude, longitude);

    // Send to backend
    const payload = { userId: 123, latitude, longitude }; // replace with real user ID
    await fetch(`${backendUrl}/api/sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // WhatsApp
    const guardians = JSON.parse(localStorage.getItem("guardians")) || [];
    const message = `🚨 SOS ALERT!
📍 Location: https://maps.google.com/?q=${latitude},${longitude}
📌 Status: ${outside ? "Outside Safe Zone ❌" : "Inside Safe Zone ✔"}
🎥 Evidence recording ACTIVE`;

    guardians.forEach(g => sendWhatsAppMessage(g.phone, message));

    // Play siren
    new Audio("/siren.mp3").play();

    alert("🚨 SOS sent & Evidence recording started!");
  } catch (err) {
    console.error(err);
    alert("❌ Unable to trigger SOS");
  }
};

// Component
export default function SOS() {
  useClapDetector(() => {
    console.log("👏 Clap detected → SOS triggered");
    triggerSOS();
  });

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>SOS Emergency</h1>
      <button
        onClick={triggerSOS}
        style={{
          background: "red",
          color: "white",
          padding: "20px 40px",
          borderRadius: 10,
          fontSize: 22,
          border: "none",
          cursor: "pointer",
          marginTop: 20,
        }}
      >
        Trigger SOS
      </button>
      <p style={{ marginTop: 20 }}>
        Clap twice loudly to trigger SOS automatically 👏👏
      </p>
    </div>
  );
}
