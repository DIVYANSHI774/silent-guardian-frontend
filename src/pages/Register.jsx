import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user permanently in localStorage
    localStorage.setItem("registeredUser", JSON.stringify(form));

    alert("✅ Registered Successfully!");

    // Redirect to login
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
            "radial-gradient(circle at 40% 30%, rgba(255,0,50,0.25), transparent 70%), radial-gradient(circle at 70% 70%, rgba(0,255,240,0.2), transparent 60%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(10,10,10,0.85)",
          padding: "45px",
          borderRadius: "16px",
          boxShadow: "0 0 30px rgba(0,255,240,0.4)",
          border: "1px solid rgba(0,255,240,0.4)",
          width: "340px",
          backdropFilter: "blur(10px)",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            color: "#00fff2",
            textShadow: "0 0 15px #00fff2, 0 0 30px rgba(0,255,240,0.7)",
            marginBottom: "25px",
          }}
        >
          Register
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          style={{
            ...buttonStyle,
            border: "1px solid rgba(0,255,240,0.6)",
            boxShadow: "0 0 15px rgba(0,255,240,0.6)",
          }}
          onMouseOver={(e) => {
            e.target.style.boxShadow = "0 0 25px rgba(0,255,240,0.9)";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(0,255,240,0.6)";
            e.target.style.transform = "scale(1)";
          }}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background:
    "linear-gradient(90deg, rgba(0,255,240,0.25), rgba(255,0,43,0.15))",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  textTransform: "uppercase",
  transition: "0.3s ease",
};
