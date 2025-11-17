// src/pages/SOS.jsx
import React from "react";
import { startEvidenceRecording } from "../pages/EvidenceRecorder"; // adjust path if needed

// ------------------------
// 1. CLAP DETECTOR HOOK
// ------------------------
const useClapDetector = (onClap) => {
  React.useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let mic;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
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

// ------------------------
// 2. GET CURRENT LOCATION
// ------------------------
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
};

// ------------------------
// 3. SAFE ZONE CHECK
// ------------------------
const isOutsideSafeZones = (lat, lng) => {
  const zones = JSON.parse(localStorage.getItem("safeZones")) || [];
  if (zones.length === 0) return true;

  // Haversine formula for distance
  const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
  };

  for (const z of zones) {
    const d = distance(lat, lng, z.lat, z.lng);
    if (d <= z.radius) return false; // inside safe zone
  }
  return true; // outside all safe zones
};

// ------------------------
// 4. SEND WHATSAPP MESSAGE
// ------------------------
const sendWhatsAppMessage = (phone, message) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url, "_blank");
};

// ------------------------
// 5. TRIGGER SOS FUNCTION
// ------------------------
const triggerSOS = async () => {
  try {
    // 1. Start evidence recording
    startEvidenceRecording();

    // 2. Get location
    const loc = await getCurrentLocation();
    const { latitude, longitude } = loc;

    // 3. Safe zone check
    const outside = isOutsideSafeZones(latitude, longitude);

    // 4. Load guardians
    const guardians = JSON.parse(localStorage.getItem("guardians")) || [];
    if (guardians.length === 0) {
      alert("⚠ No guardians added");
      return;
    }

    // 5. Prepare SOS message
    const message = `🚨 SOS ALERT!
A safety trigger was activated.

📍 Location:
https://maps.google.com/?q=${latitude},${longitude}

📌 Status: ${outside ? "Outside Safe Zone ❌" : "Inside Safe Zone ✔"}

🎥 Evidence recording ACTIVE`;

    // 6. Send WhatsApp messages
    guardians.forEach((g) => {
      sendWhatsAppMessage(g.phone, message);
    });

    // 7. Play siren
    const audio = new Audio("/siren.mp3");
    audio.play();

    alert("🚨 SOS sent & Evidence recording started!");
  } catch (error) {
    console.error(error);
  }
};

// ------------------------
// 6. SOS PAGE COMPONENT
// ------------------------
export default function SOS() {
  // Clap detection → auto SOS
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
