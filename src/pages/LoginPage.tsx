import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import '@styles/Auth.css';

export const LoginPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/graphiql');
  }, [user]);
  return (
    <div className='auth-container'>
      <h1 className='auth-title'>Log in</h1>
      <AuthForm mode='login' />
      <p className='no-account'>
        No account? Then,{' '}
        <Link to='/signup' className='signup-link'>
          sign up
        </Link>
        !
      </p>
    </div>
  );
};
