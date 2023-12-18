import { fetchUserName } from '../services/api/fetchUserName';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [scrollPosition, setScrollPosition] = useState(0);
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
    const onScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchData();
  }, [user, loading, fetchData]);

  const headerStyle: React.CSSProperties = {
    background:
      scrollPosition > 100
        ? 'linear-gradient(90deg, var(--green), var(--blue), var(--dark))'
        : 'linear-gradient(90deg, var(--dark), var(--blue), var(--green))',
    transition: 'background 2s',
  };

  const renderUser = () => {
    return (
      <nav>
        <div className='user'>
          {username && (
            <span>
              {translations[language]?.greeting}, {username}!
            </span>
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
