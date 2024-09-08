import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Route
      {...rest}
      element={user ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
