// src/routes/ProtectedRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;
//   if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
