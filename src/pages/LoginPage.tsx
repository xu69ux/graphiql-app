import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components';
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
  }, [navigate, userIs]);

  return (
    !userIs && (
      <div className='auth-container'>
        <h1 className='auth-title'>{translations?.[language]?.loginTitle}</h1>
        <AuthForm mode='login' />
        <p className='no-account'>
          {translations?.[language]?.noAccount}
          <Link to='/signup' className='signup-link'>
            {translations?.[language]?.signup}
          </Link>
          !
        </p>
      </div>
    )
  );
};
