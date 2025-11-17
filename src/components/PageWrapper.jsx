// src/components/PageWrapper.jsx
import React from "react";
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  const transition = {
    duration: 0.8,
    ease: [0.25, 0.1, 0.25, 1],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={transition}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🧠 Background particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,0,50,0.1), transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,255,240,0.1), transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
          animation: "moveGlow 10s infinite alternate ease-in-out",
        }}
      ></div>

      <style>
        {`
          @keyframes moveGlow {
            0% { transform: translate(0, 0); }
            50% { transform: translate(15px, -15px); }
            100% { transform: translate(-10px, 10px); }
          }

          @keyframes floatParticle {
            0% { transform: translateY(0); opacity: 0.8; }
            50% { transform: translateY(-20px); opacity: 1; }
            100% { transform: translateY(0); opacity: 0.8; }
          }

          .particle {
            position: absolute;
            border-radius: 50%;
            animation: floatParticle 5s infinite ease-in-out;
          }
        `}
      </style>

      {/* Neon particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            background:
              Math.random() > 0.5
                ? "rgba(255,0,50,0.8)"
                : "rgba(0,255,240,0.8)",
            boxShadow:
              Math.random() > 0.5
                ? "0 0 10px rgba(255,0,50,0.8)"
                : "0 0 10px rgba(0,255,240,0.8)",
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </motion.div>
  );
};

export default PageWrapper;
