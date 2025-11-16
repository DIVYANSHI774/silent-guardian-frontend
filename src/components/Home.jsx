import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper"; // ✅ Import wrapper

function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
          textAlign: "center",
          fontFamily: "'Orbitron', sans-serif",
          animation: "fadeIn 1.5s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "3.2rem",
            color: "#ff0033",
            textShadow: "0 0 20px rgba(255,0,50,0.8)",
            marginBottom: "15px",
          }}
        >
          Silent Guardian
        </h1>

        {/* ✨ Futuristic Tagline */}
        <p
          style={{
            fontSize: "1.2rem",
            color: "#b8ffff",
            textShadow: "0 0 10px rgba(0,255,255,0.4)",
            marginBottom: "40px",
            letterSpacing: "1px",
            animation: "fadeIn 2.5s ease-in-out",
          }}
        >
          Your Safety, is our <span style={{ color: "#ff0033" }}>Duty</span>.
        </p>

        {/* 🔘 Buttons */}
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            style={{
              border: "2px solid #00fff0",
              padding: "12px 35px",
              borderRadius: "25px",
              color: "#fff",
              background: "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(0,255,240,0.2)";
              e.target.style.boxShadow = "0 0 15px rgba(0,255,240,0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>

          <button
            style={{
              border: "2px solid #ff0033",
              padding: "12px 35px",
              borderRadius: "25px",
              color: "#fff",
              background: "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,0,50,0.2)";
              e.target.style.boxShadow = "0 0 15px rgba(255,0,50,0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.boxShadow = "none";
            }}
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>
        </div>

        {/*  Keyframes for fade animation */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

export default Home;
