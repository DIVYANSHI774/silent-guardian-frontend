// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "./authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // keep user in sync with localStorage if changed elsewhere
    const onStorage = () => setUser(authService.getCurrentUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authService.register(data);
      setUser(res.user);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await authService.login(data);
      setUser(res.user);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
