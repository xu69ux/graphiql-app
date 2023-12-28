import { Link, useNavigate } from 'react-router-dom';
import { FormLogIn } from '../components';
import { useEffect, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';

import '@styles/Auth.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const userIs = sessionStorage.getItem('authInfo');
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

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
