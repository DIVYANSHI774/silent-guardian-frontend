import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at center, #000000 0%, #0a0a0a 100%)",
        color: "#e5e5e5",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Neon background effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 25% 30%, rgba(255,0,60,0.2), transparent 60%), radial-gradient(circle at 75% 70%, rgba(0,255,255,0.2), transparent 60%)",
          zIndex: 0,
        }}
      ></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "2.8rem",
          color: "#ff0033",
          textShadow: "0 0 20px #ff0033, 0 0 40px rgba(255,0,0,0.6)",
          marginBottom: "10px",
          zIndex: 2,
        }}
      >
        🔒 About Silent Guardian
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        style={{
          fontSize: "1.1rem",
          maxWidth: "750px",
          lineHeight: "1.8",
          opacity: 0.9,
          marginTop: "20px",
          zIndex: 2,
        }}
      >
        <strong>Silent Guardian</strong> is a personal safety and emergency alert
        application designed to empower users in critical situations. With one
        tap, it shares your live location with trusted contacts — ensuring that
        help reaches you as quickly as possible.
      </motion.p>

      <div
        style={{
          marginTop: "40px",
          background: "rgba(255,255,255,0.05)",
          padding: "30px 40px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 25px rgba(255,0,50,0.3)",
          maxWidth: "600px",
          zIndex: 2,
        }}
      >
        <h3 style={{ color: "#00fff0" }}>🌍 Our Mission</h3>
        <p style={{ fontSize: "1rem", lineHeight: "1.7", marginTop: "10px" }}>
          To create a safer digital environment where technology supports
          well-being and rapid response. Safety should never be optional —
          Silent Guardian makes it effortless.
        </p>

        <h3 style={{ color: "#ff0033", marginTop: "25px" }}>💡 Vision</h3>
        <p style={{ fontSize: "1rem", lineHeight: "1.7", marginTop: "10px" }}>
          Empower every individual to feel protected and connected, no matter
          where they are. “Stay Safe. Stay Aware.”
        </p>
      </div>
    </div>
  );
}
