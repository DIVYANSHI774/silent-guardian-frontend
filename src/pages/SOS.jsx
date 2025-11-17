// src/pages/SOS.jsx
import React from "react";
import { startEvidenceRecording } from "./EvidenceRecorder";

// Backend URL
const backendUrl = "https://silent-guardian-backend.onrender.com";

// Clap detector
const useClapDetector = (onClap, active) => {
  React.useEffect(() => {
    if (!active) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let mic;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mic = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        mic.connect(analyser);
        const data = new Uint8Array(analyser.fftSize);

        const detect = () => {
          analyser.getByteTimeDomainData(data);
          let highPeak = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i] > 245 || data[i] < 10) {
              highPeak = true;
              break;
            }
          }
          if (highPeak) onClap();
          requestAnimationFrame(detect);
        };
        detect();
      })
      .catch(err => console.error("Microphone access error:", err));

    return () => mic && mic.disconnect();
  }, [onClap, active]);
};

// Get current location
const getCurrentLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    pos => resolve(pos.coords),
    err => reject(err),
    { enableHighAccuracy: true }
  );
});

// Safe zone check
const isOutsideSafeZones = (lat, lng) => {
  const zones = JSON.parse(localStorage.getItem("safeZones")) || [];
  if (!zones.length) return true;

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
    if (distance(lat, lng, z.lat, z.lng) <= z.radius) return false;
  }
  return true;
};

// Send WhatsApp message
const sendWhatsAppMessage = (phone, message) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// Trigger SOS
const triggerSOS = async () => {
  try {
    startEvidenceRecording();

    const { latitude, longitude } = await getCurrentLocation();
    const outside = isOutsideSafeZones(latitude, longitude);

    // Send to backend for logging (optional)
    const payload = { userId: 123, latitude, longitude };
    await fetch(`${backendUrl}/api/sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // WhatsApp message
    const guardians = JSON.parse(localStorage.getItem("guardians")) || [];
    const evidenceUrl = localStorage.getItem("lastEvidenceUrl") || "";

    const message = `🚨 SOS ALERT!
📍 Location: https://maps.google.com/?q=${latitude},${longitude}
📌 Status: ${outside ? "Outside Safe Zone ❌" : "Inside Safe Zone ✔"}
🎥 Evidence recording ACTIVE
🔗 Evidence: ${evidenceUrl}`;

    guardians.forEach(g => sendWhatsAppMessage(g.phone, message));

    // Play siren
    new Audio("/siren.mp3").play();

    alert("🚨 SOS sent & Evidence recording started!");
  } catch (err) {
    console.error(err);
    alert("❌ Unable to trigger SOS");
  }
};

// SOS Component
export default function SOS() {
  const [micActive, setMicActive] = React.useState(false);
  const enableClapDetection = () => setMicActive(true);

  useClapDetector(() => {
    console.log("👏 Clap detected → SOS triggered");
    triggerSOS();
  }, micActive);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>SOS Emergency</h1>

      {!micActive && (
        <button
          onClick={enableClapDetection}
          style={{
            background: "orange",
            color: "white",
            padding: "15px 30px",
            borderRadius: 10,
            fontSize: 18,
            border: "none",
            cursor: "pointer",
            marginBottom: 20
          }}
        >
          Enable Clap Detection 🎤
        </button>
      )}

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
          marginTop: 20
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
