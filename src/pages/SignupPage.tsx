import { Link } from 'react-router-dom';
import { AuthForm } from '../components';

import '@styles/Auth.css';

export const SignupPage = () => {
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
