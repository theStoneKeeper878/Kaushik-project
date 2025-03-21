import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { role: userRole } = useAuth();

  if (!userRole) return <Navigate to="/" replace />; // Not logged in, go to login page

  // 🔥 Fix: Ensure `role` works with both string and array values
  const allowedRoles = Array.isArray(role) ? role : [role];

  if (!allowedRoles.includes(userRole)) return <Navigate to={`/${userRole}`} replace />;

  return children;
};

export default ProtectedRoute;
