import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextNew';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Si el usuario no ha iniciado sesión, se le bloquea el paso
  // y se le redirige automáticamente a la pantalla de Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;