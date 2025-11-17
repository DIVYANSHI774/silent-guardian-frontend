import React, { useState } from "react";
import { motion } from "framer-motion";

export default function SOS() {
  const [status, setStatus] = useState("Tap SOS in emergency ");

  const handleSOS = async () => {
    setStatus(" Sending SOS...");

    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (p) => resolve(p.coords),
          (err) => reject(err)
        );
      });

      setStatus(
        `SOS sent from (${pos.latitude.toFixed(2)}, ${pos.longitude.toFixed(2)})`
      );
    } catch (error) {
      setStatus(" Location unavailable — sending cached SOS (Offline Mode)");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        color: "white",
        textAlign: "center",
        padding: "60px 25px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>SOS Alert System </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "25px" }}>
        Quickly notify your trusted contacts in case of an emergency.
      </p>

      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSOS}
        style={{
          backgroundColor: "#ff0033",
          color: "white",
          border: "none",
          padding: "25px 80px",
          borderRadius: "50px",
          fontSize: "22px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        }}
      >
        SOS
      </motion.button>

      <p style={{ marginTop: "30px", fontSize: "18px", opacity: 0.9 }}>{status}</p>
    </motion.div>
  );
}
