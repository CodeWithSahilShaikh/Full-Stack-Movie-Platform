import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  return isAuthenticated || token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;