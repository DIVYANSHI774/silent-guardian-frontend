import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Guardian", path: "/guardian" },
    { name: "Fake Call", path: "/fakecall" }, // ✅ Added Fake Call
    { name: "Help", path: "/help" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(12px)",
        padding: "12px 30px",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h2
        style={{
          color: "#ff0033",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "700",
          letterSpacing: "1px",
          textShadow: "0 0 10px rgba(255,0,0,0.8)",
        }}
      >
        Silent Guardian
      </h2>

      <div style={{ display: "flex", gap: "25px" }}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color:
                location.pathname === link.path
                  ? "#00fff0"
                  : "rgba(255,255,255,0.8)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "15px",
              transition: "0.3s",
              borderBottom:
                location.pathname === link.path
                  ? "2px solid #00fff0"
                  : "2px solid transparent",
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
