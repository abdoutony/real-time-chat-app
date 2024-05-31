import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

type Props = {
  children: React.ReactElement;
};

export default function PrivateRoute({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await axiosInstance.get("/auth/verify-login");
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyLogin();
  }, []);

  if (isAuthenticated === null) {
    // Show loading state or spinner while authentication is being verified
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to home page if not authenticated
    return <Navigate to="/" />;
  }

  // Render children if authenticated
  return children;
}
