import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/ContextApi";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    // Wait until auth state is initialized
    return <p>Loading...</p>; // or spinner
  }

  if (!isLoggedIn) {
    // User is not logged in, redirect
    return <Navigate to="/login" replace />;
  }

  return children;
}
