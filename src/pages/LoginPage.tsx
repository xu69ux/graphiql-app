import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormLogIn } from '@components/index';
import { translations } from '@contexts/translations';
import useLanguage from '@hooks/useLanguage';

import '@styles/Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const userIs = sessionStorage.getItem('userName') !== null;
  const { language } = useLanguage();

  useEffect(() => {
    if (userIs) navigate('/graphiql');
  }, [userIs, navigate]);

  return (
    !userIs && (
      <div className='auth-container' data-testid='login-page'>
        <h1 className='auth-title' data-testid='login-title'>
          {translations?.[language]?.loginTitle}
        </h1>
        <FormLogIn />
        <p className='no-account'>
          {translations?.[language]?.noAccount}
          <Link to='/signup' className='signup-link' data-testid='signup-link'>
            {translations?.[language]?.signup}
          </Link>
          !
        </p>
      </div>
    )
  );
};

export default LoginPage;
