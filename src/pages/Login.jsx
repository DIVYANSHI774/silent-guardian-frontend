import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!registeredUser) {
      alert("❌ No registered user found! Please register first.");
      return;
    }

    if (
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      localStorage.setItem("user", JSON.stringify(registeredUser));
      alert("✅ Login successful!");

      // Redirect to profile
      window.location.href = "/profile";
    } else {
      alert("❌ Incorrect email or password!");
    }
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
      {/* Neon background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,0,50,0.25), transparent 70%), radial-gradient(circle at 70% 70%, rgba(0,255,240,0.18), transparent 60%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      ></div>

      <form
        onSubmit={handleLogin}
        style={{
          background: "rgba(10,10,10,0.8)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 0 30px rgba(255,0,43,0.4)",
          border: "1px solid rgba(255,0,43,0.4)",
          backdropFilter: "blur(10px)",
          width: "320px",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            color: "#ff002b",
            textShadow:
              "0 0 15px #ff002b, 0 0 30px rgba(255,0,43,0.6)",
            marginBottom: "25px",
          }}
        >
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(255,0,43,0.5)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(0,255,240,0.4)",
            background: "rgba(255,255,255,0.05)",
            color: "white",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background:
              "linear-gradient(90deg, rgba(255,0,43,0.3), rgba(0,255,240,0.2))",
            color: "white",
            border: "1px solid rgba(255,0,43,0.6)",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            boxShadow: "0 0 15px rgba(255,0,43,0.6)",
            transition: "0.3s ease",
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
          LOGIN
        </button>
      </form>
    </div>
  );
}
