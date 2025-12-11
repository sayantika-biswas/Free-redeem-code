// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/" replace />; // Redirect to home or login page
  }
  return children;
}
