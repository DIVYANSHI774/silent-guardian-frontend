import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ✅ Required for Tailwind or global styles
import App from "./App";

// ✅ Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🧩 Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* 🔔 Global Toast Notification Container */}
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </React.StrictMode>
);

// ✅ Register Service Worker for Offline Support (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js") // ✅ consistent file name (no hyphen)
      .then((registration) => {
        console.log("✅ Service Worker Registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("❌ Service Worker registration failed:", error);
      });
  });
} else {
  console.log("⚠️ Service workers are not supported in this browser.");
}
