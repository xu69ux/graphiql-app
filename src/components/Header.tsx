import { fetchUserName } from '../services/api/fetchUserName';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { translations } from '../contexts/translations';
import { Fade } from '../components';
import { auth, logout } from '../utils/firebase';
import useShowMessage from '../hooks/useShowMessage';
import useMsg from '../hooks/useMsg';
import { CustomButton } from '../components';
import { LanguageContext } from '../contexts/LanguageContext';

import { IoEarthOutline } from 'react-icons/io5';

import '@styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [user, loading] = useAuthState(auth);
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const showMessage = useShowMessage();
  const msg = useMsg();
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language, setLanguage } = languageContext;

  const fetchData = useCallback(async () => {
    if (user) {
      const userName = await fetchUserName(user);
      setUserName(userName);
    } else {
      setUserName('');
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchData();
  }, [user, loading, fetchData]);

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchData();
  }, [user, loading, fetchData]);

  const logoutHandle = () => {
    logout();
    navigate('/');
    showMessage(msg.LOG_OUT_SUCCESS);
    sessionStorage.removeItem('authInfo');
  };

  const renderUser = () => {
    return (
      <nav>
        <div className={`user ${scrolled ? 'scrolled' : ''}`}>
          {username && (
            <>
              <span>
                {translations[language]?.greeting}, {username}!
              </span>
              <Link to='/graphiql' className='graphiql'>
                <span>
                  go to <b>IDE</b>
                </span>
              </Link>
            </>
          )}
          <CustomButton
            className='btn btn-header btn-logout'
            onClick={logoutHandle}
            title={translations[language]?.logout}
          />
        </div>
      </nav>
    );
  };

  const renderNoUser = () => {
    return (
      <nav>
        <div className='user'>
          <CustomButton
            className='btn btn-header btn-login'
            onClick={() => navigate('/login')}
            title={translations[language]?.login}
          />
          <CustomButton
            className='btn btn-header btn-signup'
            onClick={() => navigate('/signup')}
            title={translations[language]?.signup}
          />
        </div>
      </nav>
    );
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className='welcome-link'>
        <div
          className={`logo ${scrolled ? 'scrolled' : ''}`}
          onClick={() => navigate('/')}
        >
          GraphiQL IDE
        </div>
        <div
          className='lang-menu'
          onClick={() => toggleDropdown(!isDropdownOpen)}
        >
          <IoEarthOutline
            className={`lang-icon ${scrolled ? 'scrolled' : ''}`}
            title='change language'
          />
          <Fade show={isDropdownOpen}>
            <div className='lang-dropdown'>
              <button
                onClick={() => {
                  setLanguage('eng');
                }}
                className={language === 'eng' ? 'selected' : ''}
              >
                eng
              </button>
              <button
                onClick={() => {
                  setLanguage('rus');
                }}
                className={language === 'rus' ? 'selected' : ''}
              >
                rus
              </button>
              <button
                onClick={() => {
                  setLanguage('ukr');
                }}
                className={language === 'ukr' ? 'selected' : ''}
              >
                ukr
              </button>
            </div>
          </Fade>
        </div>
      </div>
      {user ? renderUser() : renderNoUser()}
    </header>
  );
};
