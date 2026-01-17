import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const ContextApi = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isLoggedIn: false,
  });

  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token, isLoggedIn: true });
    }
    setLoading(false); // done checking
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ token, isLoggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, loading }}>
      {!loading && children} {/* only render children after loading */}
    </AuthContext.Provider>
  );
};
