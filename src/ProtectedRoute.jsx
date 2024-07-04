// ProtectedRoute.jsx

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem("jwt");

  if (!isLoggedIn) {
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
