import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormSignUp } from '../components';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';

import '@styles/Auth.css';

export const SignupPage = () => {
  const navigate = useNavigate();
  const userIs = sessionStorage.getItem('authInfo');
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  useEffect(() => {
    if (userIs) return navigate('/graphiql');
  }, [userIs, navigate]);

  return (
    <div className='auth-container'>
      <h1 className='auth-title'>{translations?.[language]?.signupTitle}</h1>
      <FormSignUp />
      <p className='no-account'>
        {translations?.[language]?.yesAccount}
        <Link to='/login' className='login-link'>
          {translations?.[language]?.login}
        </Link>
        !
      </p>
    </div>
  );
};
