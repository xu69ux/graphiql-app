import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/WelcomePage.css';

export const WelcomePage = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    return null;
  }

  const { language } = languageContext;
  const welcome = translations?.[language]?.welcome;
  const login = translations?.[language]?.login;
  const signup = translations?.[language]?.signup;
  const or = translations?.[language]?.or;

  return (
    <div className='welcome-container'>
      <h1 className='welcome-title'>GraphiQL IDE</h1>
      <p className='typing-effect'>{welcome}</p>
      <div className='welcome-auth'>
        <div className='login-icon'>
          <IoChevronForward />
          <IoChevronForward />
          <IoChevronForward />
        </div>
        <Link to='/login' className='welcome-link'>
          {login}
        </Link>
        <span>{or}</span>
        <Link to='/signup' className='welcome-link'>
          {signup}
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
