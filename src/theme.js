// src/theme.js
export const appTheme = {
  background: "radial-gradient(circle at top left, #8e2de2, #4a00e0 70%, #0f051d)",
  color: "white",
  fontFamily: "'Poppins', sans-serif",
  glowBox: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    boxShadow: "0 0 25px rgba(142, 45, 226, 0.4)",
    backdropFilter: "blur(15px)",
    padding: "40px",
  },
  button: {
    background: "linear-gradient(135deg, #b621fe, #1fd1f9)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    padding: "12px 25px",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 0 20px rgba(182, 33, 254, 0.4)",
    transition: "transform 0.2s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.05)",
  },
};
