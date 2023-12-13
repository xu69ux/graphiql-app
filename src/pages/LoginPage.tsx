import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components';
import { useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';

import '@styles/Auth.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  useEffect(() => {
    if (user) return navigate('/graphiql');
  }, [user]);

  return (
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
  );
};
