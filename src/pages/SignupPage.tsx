import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

import '@styles/Auth.css';

export const SignupPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate('/graphiql');
  }, [user]);
  return (
    <div className='auth-container'>
      <h1 className='auth-title'>Sign up</h1>
      <AuthForm mode='register' />
      <p className='no-account'>
        Already have an account? Then{' '}
        <Link to='/login' className='login-link'>
          log in
        </Link>
        !
      </p>
    </div>
  );
};
