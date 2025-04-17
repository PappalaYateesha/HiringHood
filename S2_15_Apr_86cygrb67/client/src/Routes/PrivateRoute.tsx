import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactNode;
  roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
