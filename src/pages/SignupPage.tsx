import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormSignUp } from '../components';
import { translations } from '../contexts/translations';
import useLanguage from '../hooks/useLanguage';

import '@styles/Auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const userIs = sessionStorage.getItem('authInfo');
  const { language } = useLanguage();

  useEffect(() => {
    if (userIs) navigate('/graphiql');
  }, [userIs, navigate]);

  return (
    !userIs && (
      <div className='auth-container'>
        <h1 className='auth-title' data-testid='signup-title'>
          {translations?.[language]?.signupTitle}
        </h1>
        <FormSignUp />
        <p className='no-account'>
          {translations?.[language]?.yesAccount}
          <Link to='/login' className='login-link' data-testid='login-link'>
            {translations?.[language]?.login}
          </Link>
          !
        </p>
      </div>
    )
  );
};

export default SignupPage;
