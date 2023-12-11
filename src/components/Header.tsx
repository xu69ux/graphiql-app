import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoEarthOutline } from 'react-icons/io5';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';
import { Fade } from '../components';

import '@styles/Header.css';

export const Header = () => {
  const username = 'user';
  const navigate = useNavigate();
  const languageContext = useContext(LanguageContext);
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const [selectedLanguage, selectLanguage] = useState('english');
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!languageContext) {
    return null;
  }
  const { language, setLanguage } = languageContext;

  const greeting = translations?.[language]?.greeting;
  console.log(greeting);
  console.log('language:', language);

  const logoutHandle = () => {
    navigate('/');
  };

  const headerStyle: React.CSSProperties = {
    background:
      scrollPosition > 100
        ? 'linear-gradient(90deg, var(--green), var(--blue), var(--dark))'
        : 'linear-gradient(90deg, var(--dark), var(--blue), var(--green))',
    transition: 'background 2s',
  };

  return (
    <header style={headerStyle} className='header'>
      <div className='welcome-link'>
        <div className='logo' onClick={() => navigate('/')}>
          GraphiQL IDE
        </div>
        <div
          className='lang-menu'
          onClick={() => toggleDropdown(!isDropdownOpen)}
        >
          <IoEarthOutline className='lang-icon' title='change language' />
          <Fade show={isDropdownOpen}>
            <div className='lang-dropdown'>
              <Link
                to='#english'
                onClick={() => {
                  selectLanguage('english');
                  setLanguage('eng');
                }}
                className={selectedLanguage === 'english' ? 'selected' : ''}
              >
                eng
              </Link>
              <Link
                to='#russian'
                onClick={() => {
                  selectLanguage('russian');
                  setLanguage('rus');
                }}
                className={selectedLanguage === 'russian' ? 'selected' : ''}
              >
                rus
              </Link>
              <Link
                to='#ukrainian'
                onClick={() => {
                  selectLanguage('ukrainian');
                  setLanguage('ukr');
                }}
                className={selectedLanguage === 'ukrainian' ? 'selected' : ''}
              >
                ukr
              </Link>
            </div>
          </Fade>
        </div>
      </div>
      <nav>
        <div className='user'>
          <span>
            {greeting}, {username}!
          </span>
          <button className='btn logout' onClick={logoutHandle}>
            log out
          </button>
        </div>
      </nav>
    </header>
  );
};
