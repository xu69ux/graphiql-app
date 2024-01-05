import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const user = sessionStorage.getItem('authInfo');
  const userIs = sessionStorage.getItem('userName');

  return user || userIs ? <Outlet /> : <Navigate to='/' />;
};
