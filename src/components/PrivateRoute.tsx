import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const user = sessionStorage.getItem('authInfo');
  const userIs = sessionStorage.getItem('userName');

  return user || userIs ? (
    <div data-testid='outlet'>
      <Outlet />
    </div>
  ) : (
    <div data-testid='navigate'>
      <Navigate to='/' />
    </div>
  );
};
