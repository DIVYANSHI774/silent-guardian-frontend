// src/pages/Guardians.jsx
import React, { useState, useEffect } from "react";

export default function Guardians() {
  const [guardians, setGuardians] = useState([]);
  const [phone, setPhone] = useState("");

  // Load guardians from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("guardians")) || [];
    setGuardians(saved);
  }, []);

  const addGuardian = () => {
    if (!phone) return alert("Enter a phone number");

    const newGuardian = { phone };
    const updated = [...guardians, newGuardian];
    setGuardians(updated);
    localStorage.setItem("guardians", JSON.stringify(updated));
    setPhone("");
  };

  const removeGuardian = (index) => {
    const updated = guardians.filter((_, i) => i !== index);
    setGuardians(updated);
    localStorage.setItem("guardians", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Guardians</h1>

      <div>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: 8, fontSize: 16, marginRight: 10 }}
        />
        <button onClick={addGuardian} style={{ padding: 8, fontSize: 16 }}>
          Add
        </button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {guardians.map((g, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            {g.phone}{" "}
            <button onClick={() => removeGuardian(index)} style={{ marginLeft: 10 }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
