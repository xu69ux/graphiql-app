import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import {
  LanguageMenu,
  Logo,
  Greeting,
  UserComponent,
  NoUserComponent,
} from '..';
import { fetchUserName } from '../../services/api/fetchUserName';

import '@styles/Header.css';

export const Header = () => {
  const storedName = sessionStorage.getItem('userName');
  const isStoredName = sessionStorage.getItem('userName') !== null;
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      const scroll = window.scrollY > 50;
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
          <Greeting name={storedName} isLoading={isLoading} />
          <div className='header-links'>
            {isStoredName ? <UserComponent /> : <NoUserComponent />}
          </div>
        </div>
      </nav>
    </header>
  );
};
