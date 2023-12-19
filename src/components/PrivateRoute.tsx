import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = sessionStorage.getItem('authInfo');

  return !user ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
