// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; // Ensure casing matches

const ProtectedRoute = ({ children }) => {
  const { currUser } = useContext(AuthContext);

  if (!currUser) {
    if (!currUser) {
      // alert('You need to be logged in to access this page. Redirecting to login.');
      return <Navigate to="/login" />;
    }
  }

  // If the user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;
