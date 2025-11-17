import React, { useState } from "react";

function GuardianForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // ✅ Use SAME KEY as SOS.jsx → "guardians"
  const [guardians, setGuardians] = useState(
    JSON.parse(localStorage.getItem("guardians")) || []
  );

  const handleAddGuardian = () => {
    if (!name || !number) {
      alert("⚠ Please enter both name and phone number!");
      return;
    }

    // Validate number
    if (!/^[0-9]{10,13}$/.test(number)) {
      alert("⚠ Enter a valid phone number (10–13 digits).");
      return;
    }

    const updated = [...guardians, { name, phone: number }];
    setGuardians(updated);

    // ✅ Save to SAME key
    localStorage.setItem("guardians", JSON.stringify(updated));

    setName("");
    setNumber("");
    alert("✅ Guardian added!");
  };

  const handleDelete = (index) => {
    const updated = guardians.filter((_, i) => i !== index);
    setGuardians(updated);

    // Update storage
    localStorage.setItem("guardians", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #000 0%, #111 100%)",
        color: "#eee",
        fontFamily: "Poppins, sans-serif",
        padding: "40px 20px",
      }}
    >
      <h2 style={{ color: "#ff0033", fontSize: "2.3rem", marginBottom: "15px" }}>
        Guardian Contacts
      </h2>

      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          padding: "25px",
          borderRadius: "12px",
          maxWidth: "450px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Guardian Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number (with country code optional)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleAddGuardian} style={buttonStyle}>
          ➕ Add Guardian
        </button>

        <h3 style={{ marginTop: "20px", color: "#00fff0" }}>Saved Contacts:</h3>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {guardians.map((g, i) => (
            <li
              key={i}
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "10px 15px",
                borderRadius: "8px",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <strong>{g.name}</strong> — {g.phone}
              </span>

              {/* DELETE BUTTON FIXED */}
              <button
                onClick={() => handleDelete(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff0033",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "#fff",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  background: "#ff0033",
  border: "none",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
};

export default GuardianForm;
