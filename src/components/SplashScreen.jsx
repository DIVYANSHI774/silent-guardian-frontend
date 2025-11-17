import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundImage:
        "url('https://thumbs.dreamstime.com/b/futuristic-lock-binary-matrix-image-features-futuristic-lock-glowing-edges-center-matrix-filled-353073426.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
      color: "#fff",
      fontFamily: "'Orbitron', sans-serif",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(6px)",
      zIndex: 0,
    },
    title: {
      fontSize: "3rem",
      fontWeight: "700",
      color: "#ff0033",
      textShadow: "0 0 25px #ff0033, 0 0 60px #00fff0",
      animation: "glowPulse 2s infinite alternate",
      zIndex: 1,
    },
    subtitle: {
      marginTop: "1rem",
      fontSize: "1.2rem",
      color: "#ccc",
      zIndex: 1,
      letterSpacing: "1px",
      textShadow: "0 0 10px rgba(255,255,255,0.4)",
    },
    keyframes: `
      @keyframes glowPulse {
        from { text-shadow: 0 0 15px #ff0033, 0 0 30px #00fff0; opacity: 0.8; }
        to { text-shadow: 0 0 30px #ff0033, 0 0 70px #00fff0; opacity: 1; }
      }
    `,
  };

  return (
    <div style={styles.container}>
      <style>{styles.keyframes}</style>
      <div style={styles.overlay}></div>
      <h1 style={styles.title}>Silent Guardian</h1>
      <p style={styles.subtitle}>Initializing Secure Environment...</p>
    </div>
  );
};

export default SplashScreen;
