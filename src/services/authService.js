// src/services/authService.js

export const authService = {
  // 🔐 LOGIN FUNCTION
  login: async (email, password) => {
    // Local storage se user data nikalna
    const userData = JSON.parse(localStorage.getItem("user"));

    // Agar user exist nahi karta
    if (!userData) {
      throw new Error("No user found. Please register first.");
    }

    // Email aur password match karte hain kya?
    if (userData.email === email && userData.password === password) {
      // Logged-in status store karna
      localStorage.setItem("loggedIn", true);
      return { email };
    } else {
      throw new Error("Invalid email or password.");
    }
  },

  // 📝 REGISTER FUNCTION
  register: async (email, password) => {
    // Naya user save karna local storage me
    const newUser = { email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  },

  // 🚪 LOGOUT FUNCTION
  logout: () => {
    localStorage.removeItem("loggedIn");
  },

  // 👤 CURRENT USER KO PATA LAGANA
  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("loggedIn");
    return isLoggedIn ? user : null;
  },
};
