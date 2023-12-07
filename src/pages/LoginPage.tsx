import { Link } from 'react-router-dom';
import { AuthForm } from '../components';

import '@styles/Auth.css';

export const LoginPage = () => {
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
