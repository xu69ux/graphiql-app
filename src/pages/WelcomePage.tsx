import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/WelcomePage.css';

export const WelcomePage = () => {
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  return (
    <div className='welcome-container'>
      <h1 className='welcome-title'>GraphiQL IDE</h1>
      <p className='typing-effect'>{translations[language]?.welcome}</p>
      <div className='welcome-auth'>
        <div className='login-icon'>
          <IoChevronForward />
          <IoChevronForward />
          <IoChevronForward />
        </div>
        <Link to='/login' className='welcome-link'>
          {translations[language]?.login}
        </Link>
        <span>{translations[language]?.or}</span>
        <Link to='/signup' className='welcome-link'>
          {translations[language]?.signup}
        </Link>
        <div className='signup-icon'>
          <IoChevronForward />
          <IoChevronForward />
          <IoChevronForward />
        </div>
      </div>
    </div>
  );
};
