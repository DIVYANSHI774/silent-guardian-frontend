import React from "react";

export default function Profile() {
  // Get logged-in user
  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Anonymous",
      email: "unknown@example.com",
    };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("👋 Logged out!");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at center, #050505 0%, #000000 90%)",
        color: "#e5e5e5",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,0,43,0.2), transparent 70%), radial-gradient(circle at 70% 70%, rgba(0,255,240,0.18), transparent 60%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          background: "rgba(10,10,10,0.85)",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 0 30px rgba(255,0,43,0.5)",
          border: "1px solid rgba(255,0,43,0.5)",
          width: "350px",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            color: "#ff002b",
            textShadow:
              "0 0 15px #ff002b, 0 0 30px rgba(255,0,43,0.6)",
            marginBottom: "15px",
          }}
        >
          Profile
        </h2>

        <p style={{ fontSize: "1rem", marginBottom: "8px" }}>
          <b>Name:</b> {user.name}
        </p>

        <p style={{ fontSize: "1rem", marginBottom: "25px" }}>
          <b>Email:</b> {user.email}
        </p>

        <button
          onClick={() => alert("⚙️ Edit profile feature coming soon!")}
          style={{
            padding: "12px 30px",
            background:
              "linear-gradient(90deg, rgba(255,0,43,0.25), rgba(0,255,240,0.2))",
            color: "white",
            border: "1px solid rgba(255,0,43,0.6)",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            boxShadow: "0 0 15px rgba(255,0,43,0.6)",
            transition: "0.3s ease",
            marginBottom: "15px",
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = "0 0 25px rgba(255,0,43,0.9)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(255,0,43,0.6)";
            e.target.style.transform = "scale(1)";
          }}
        >
          EDIT PROFILE
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 30px",
            background:
              "linear-gradient(90deg, rgba(255,0,43,0.2), rgba(255,255,255,0.1))",
            color: "white",
            border: "1px solid rgba(255,0,43,0.5)",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            textTransform: "uppercase",
            boxShadow: "0 0 15px rgba(255,0,43,0.4)",
            transition: "0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = "0 0 25px rgba(255,0,43,0.8)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(255,0,43,0.4)";
            e.target.style.transform = "scale(1)";
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
