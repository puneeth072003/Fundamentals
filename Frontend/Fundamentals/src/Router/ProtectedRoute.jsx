import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, ...props }) => {
  const role = localStorage.getItem('state');

  if (!role || role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;