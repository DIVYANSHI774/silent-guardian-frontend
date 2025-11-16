import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Pages
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SOS from "./pages/SOS";
import FakeCall from "./components/FakeCall";
import Help from "./pages/Help";
import About from "./pages/About";
import GuardianForm from "./components/GuardianForm"; // 🆕 import added

// ✅ Navbar
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div
      style={{
        background: "radial-gradient(circle at 50% 20%, #000000 60%, #0a0a0a 100%)",
        minHeight: "100vh",
        color: "#e0e0e0",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s ease",
      }}
    >
      <Router>
        <MainRoutes />
      </Router>
    </div>
  );
}

function MainRoutes() {
  const location = useLocation();

  // 🌀 Hide Navbar & SOS button on splash screen
  const hideNavbar = location.pathname === "/splash";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div style={styles.pageWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={styles.motionContainer}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sos" element={<SOS />} />
              <Route path="/fakecall" element={<FakeCall />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/guardian" element={<GuardianForm />} /> {/* 🆕 new route added */}
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🚨 Floating SOS Button */}
      {!hideNavbar && (
        <button
          style={styles.sosButton}
          onClick={() => (window.location.href = "/sos")}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.15)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
        >
          🚨
        </button>
      )}

      {/* 🌍 Footer */}
      {!hideNavbar && (
        <footer style={styles.footer}>
          © 2025 <span style={{ color: "#ff002b" }}>Silent Guardian</span> —{" "}
          <span style={{ color: "#00fff2" }}>Stay Safe, Stay Aware</span> 💖
        </footer>
      )}
    </>
  );
}

const styles = {
  pageWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
  },
  motionContainer: {
    width: "100%",
    maxWidth: "900px",
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(10, 10, 10, 0.85)",
    border: "1px solid rgba(255, 0, 43, 0.3)",
    borderRadius: "16px",
    boxShadow: "0 0 25px rgba(255, 0, 43, 0.3), inset 0 0 10px rgba(0,255,242,0.2)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    transition: "all 0.3s ease",
  },
  sosButton: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "radial-gradient(circle, #ff002b, #8b0000)",
    color: "#fff",
    border: "2px solid #ff002b",
    borderRadius: "50%",
    width: "70px",
    height: "70px",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 25px #ff002b, 0 0 50px rgba(255, 0, 43, 0.3)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
  },
  footer: {
    textAlign: "center",
    padding: "15px",
    background: "linear-gradient(to right, rgba(10,10,10,0.9), rgba(20,0,0,0.8))",
    fontSize: "14px",
    borderTop: "1px solid rgba(255, 0, 43, 0.3)",
    color: "#cfcfcf",
    letterSpacing: "0.5px",
    textShadow: "0 0 8px rgba(0,255,242,0.3)",
  },
};
