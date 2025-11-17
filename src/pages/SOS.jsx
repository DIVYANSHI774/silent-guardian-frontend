// src/pages/SOS.jsx
import React from "react";
import { startEvidenceRecording } from "./EvidenceRecorder"; // adjust path
const backendUrl = "https://silent-guardian-backend.onrender.com";

// ------------------------
// 1. Helper functions
// ------------------------

// Get user location
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
};

// Check if outside safe zones
const isOutsideSafeZones = (lat, lng) => {
  const zones = JSON.parse(localStorage.getItem("safeZones")) || [];
  if (zones.length === 0) return true;

  const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  for (const z of zones) {
    const d = distance(lat, lng, z.lat, z.lng);
    if (d <= z.radius) return false;
  }
  return true;
};

// Send WhatsApp message
const sendWhatsAppMessage = (phone, message) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

// ------------------------
// 2. Clap Detector Hook
// ------------------------
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

// ------------------------
// 3. Trigger SOS
// ------------------------
const triggerSOS = async () => {
  try {
    // Start recording
    startEvidenceRecording();

    // Get location
    const { latitude, longitude } = await getCurrentLocation();
    const outside = isOutsideSafeZones(latitude, longitude);

    // Send to backend
    const payload = { userId: 123, latitude, longitude };
    await fetch(`${backendUrl}/api/sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Load guardians from localStorage
    const guardians = JSON.parse(localStorage.getItem("guardians")) || [];
    if (!guardians.length) return alert("⚠ No guardians added!");

    // Build message
    const evidenceUrl = localStorage.getItem("lastEvidenceUrl") || "";
    const message = `🚨 SOS ALERT!
📍 Location: https://maps.google.com/?q=${latitude},${longitude}
📌 Status: ${outside ? "Outside Safe Zone ❌" : "Inside Safe Zone ✔"}
🎥 Evidence recording ACTIVE
🔗 Evidence: ${evidenceUrl}`;

    // Send WhatsApp
    guardians.forEach(g => sendWhatsAppMessage(g.phone, message));

    // Play siren
    new Audio("/siren.mp3").play();

    alert("🚨 SOS sent & Evidence recording started!");
  } catch (err) {
    console.error(err);
    alert("❌ Unable to trigger SOS");
  }
};

// ------------------------
// 4. SOS Component
// ------------------------
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
          style={{ background: "orange", color: "white", padding: "15px 30px", fontSize: 18, borderRadius: 10, marginBottom: 20 }}
        >
          Enable Clap Detection 🎤
        </button>
      )}

      <button
        onClick={triggerSOS}
        style={{ background: "red", color: "white", padding: "20px 40px", fontSize: 22, borderRadius: 10 }}
      >
        Trigger SOS
      </button>

      <p style={{ marginTop: 20 }}>
        Clap twice loudly to trigger SOS automatically 👏👏
      </p>
    </div>
  );
}
