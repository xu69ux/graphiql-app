import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/WelcomePage.css';

export const WelcomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > previousScrollY) {
        setIsScrolled(currentScrollY > 100);
      } else {
        setIsScrolled(currentScrollY > 0);
      }
      previousScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <div className={`welcome-description ${isScrolled ? '' : 'blur'}`}>
        <p className={`${isScrolled ? 'change-color' : 'default-color'}`}>
          {translations[language]?.welcomeDescription1}
        </p>
        <p className={`${isScrolled ? 'change-color' : 'default-color'}`}>
          {translations[language]?.welcomeDescription2}
        </p>
        <p className={`${isScrolled ? 'change-color' : 'default-color'}`}>
          {translations[language]?.welcomeDescription3}
        </p>
        <p className={`${isScrolled ? 'change-color' : 'default-color'}`}>
          {translations[language]?.welcomeDescription4}
        </p>
      </div>
    </div>
  );
};
