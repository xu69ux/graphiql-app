import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const user = sessionStorage.getItem('authInfo');

  return user ? <Outlet /> : <Navigate to='/' />;
};
