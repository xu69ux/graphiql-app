import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedArrows } from '@components/index';
import { translations } from '@contexts/translations';
import useLanguage from '@hooks/useLanguage';

import '@styles/WelcomePage.css';

const WelcomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();

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
    <div className='welcome-container' data-testid='welcome-page'>
      <h1 className='welcome-title' data-testid='graphiqlide'>
        Graphi<span>QL</span>IDE
      </h1>
      <p className='typing-effect'>{translations[language]?.welcome}</p>
      <div className='welcome-auth'>
        <div className='welcome-auth-login'>
          <AnimatedArrows />
          <Link to='/login' className='welcome-link'>
            {translations[language]?.login}
          </Link>
        </div>

        <span>{translations[language]?.or}</span>
        <div className='welcome-auth-signup'>
          <Link to='/signup' className='welcome-link'>
            {translations[language]?.signup}
          </Link>
          <AnimatedArrows style={{ transform: 'rotate(180deg)' }} />
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
        <p className={`${isScrolled ? 'change-color' : 'default-color'}`}>
          {translations[language]?.thanxSlava1}
          <br />
          <a href='https://github.com/SlavaJSFE' className='slava-git'>
            {translations[language]?.ViachaslauShpileuski}
          </a>
          <span>{translations[language]?.thanxSlava2}</span>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
