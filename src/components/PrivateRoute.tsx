import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('authInfo');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  return !user ? null : <>{children}</>;
};

export default PrivateRoute;
