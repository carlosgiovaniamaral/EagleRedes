// ProtectRoutes.js
import React, { ReactNode } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAuthContext } from "../../auth/AuthContext";

interface ProtectedRouteProps extends Omit<RouteProps, "element"> {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
