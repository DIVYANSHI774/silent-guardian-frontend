import React from "react";
import { motion } from "framer-motion";

export default function Help() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, #000000 0%, #0a0a0a 100%)",
        color: "#e5e5e5",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        padding: "60px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glowing background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,0,60,0.2), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0,255,255,0.2), transparent 60%)",
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
          marginBottom: "20px",
          zIndex: 2,
        }}
      >
         Need Help?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "1.1rem",
          maxWidth: "700px",
          lineHeight: "1.7",
          opacity: 0.9,
          zIndex: 2,
        }}
      >
        The <strong>SOS System</strong> instantly sends your live location to
        your registered guardians via WhatsApp. Ensure your GPS and internet are
        turned on before using it.
      </motion.p>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "25px 35px",
          borderRadius: "12px",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 25px rgba(255,0,50,0.3)",
          marginTop: "40px",
          textAlign: "left",
          width: "100%",
          maxWidth: "600px",
          zIndex: 2,
        }}
      >
        <h3 style={{ color: "#00fff0", marginBottom: "15px" }}>Quick Tips:</h3>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
          <li>✅ Always keep your guardian list updated.</li>
          <li>✅ Enable GPS and WhatsApp permissions.</li>
          <li>✅ Use the SOS button in emergencies only.</li>
          <li>✅ Check your profile for saved data regularly.</li>
        </ul>

        <h3 style={{ color: "#ff0033", marginTop: "25px" }}>
          In case of app issues:
        </h3>
        <p style={{ fontSize: "0.95rem" }}>
          Contact support at{" "}
          <strong style={{ color: "#00fff0" }}>support@silentguardian.in</strong>
        </p>
      </div>
    </div>
  );
}
