import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; // Ensure casing matches

// Role constants for readability and future-proofing
const roles = {
  USER: 1000,
  ADMIN: 1001,
  SUPERVISOR: 1002,
};

// Protected route for any authenticated user
export const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { currUser } = useContext(AuthContext);

  if (!currUser) {
    console.log('User is not authenticated, redirecting to login.');
    return <Navigate to={redirectPath} />;
  }

  return children;
};

// Protected route for admin or supervisor users
export const ProtectedRouteAdmin = ({ children, redirectPath = "/posts/home", requiredRole = roles.ADMIN }) => {
  const { currUser } = useContext(AuthContext);

  if (!currUser || currUser.role < requiredRole) {
    console.log(`User does not have required privileges (role: ${currUser?.role}), redirecting to home.`);
    return <Navigate to={redirectPath} />;
  }

  return children;
};

// Exporting the components for use
