import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth, logout } from '../utils/firebase';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../contexts/translations';
import { LanguageMenu, Logo, Greeting } from '../components';
import useShowMessage from '../hooks/useShowMessage';
import useMsg from '../hooks/useMsg';
import { fetchUserName } from '../services/api/fetchUserName';
import { useAuthState } from 'react-firebase-hooks/auth';

import '@styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  const storedName = sessionStorage.getItem('userName');
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const showMessage = useShowMessage();
  const msg = useMsg();
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  const fetchData = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const userName = await fetchUserName(user);
        sessionStorage.setItem('userName', `${userName}`);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY > 100;
      if (scroll !== isScrolled) {
        setIsScrolled(!isScrolled);
      }
    };
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  useEffect(() => {
    fetchData();
  }, [user, loading, fetchData]);

  const logoutHandle = () => {
    logout();
    navigate('/');
    showMessage(msg.LOG_OUT_SUCCESS);
    sessionStorage.removeItem('authInfo');
    sessionStorage.removeItem('userName');
  };

  const renderUser = () => {
    return (
      <>
        {user && (
          <>
            {location.pathname !== '/graphiql' && (
              <>
                <Link to='/graphiql' className='header-link'>
                  IDE
                </Link>
                <span className='link-sep'>/</span>
              </>
            )}
            <Link to='/' className='header-link' onClick={logoutHandle}>
              {translations[language]?.logout}
            </Link>
          </>
        )}
      </>
    );
  };

  const renderNoUser = () => {
    return (
      <>
        <Link to='/login' className='header-link'>
          {translations[language]?.login}
        </Link>
        <span className='link-sep'>/</span>
        <Link to='/signup' className='header-link'>
          {translations[language]?.signup}
        </Link>
      </>
    );
  };

  return (
    <header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      data-testid='header'
    >
      <nav className='navigation'>
        <div className='navigation-left'>
          <Logo isScrolled={isScrolled} />
          <LanguageMenu isScrolled={isScrolled} />
        </div>
        <div className='navigation-right'>
          {storedName ? (
            <Greeting name={storedName} isLoading={isLoading} />
          ) : (
            <Greeting name={null} isLoading={isLoading} />
          )}
          <div className='header-links'>
            {user ? renderUser() : renderNoUser()}
          </div>
        </div>
      </nav>
    </header>
  );
};
