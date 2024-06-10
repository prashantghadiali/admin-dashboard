import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../utils/auth';


const ProtectedRoute = ({ children }) => {
  const handleLogin = isLogin();

  if (!handleLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;