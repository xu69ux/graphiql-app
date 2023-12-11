import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEarthOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Fade } from '../components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';
import { fetchUserName } from '../services/api/fetchUserName';
import '@styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const [selectedLanguage, selectLanguage] = useState('english');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(auth);
  console.log(user);
  const fetchData = async () => {
    if (user) {
      const userName = await fetchUserName(user);
      setName(userName);
    } else {
      setName('');
    }
  };

  useEffect(() => {
    const onScroll = () => setScrollPosition(window.pageYOffset);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoutHandle = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    fetchData();
  }, [user, loading]);

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
                onClick={() => selectLanguage('english')}
                className={selectedLanguage === 'english' ? 'selected' : ''}
              >
                eng
              </Link>
              <Link
                to='#russian'
                onClick={() => selectLanguage('russian')}
                className={selectedLanguage === 'russian' ? 'selected' : ''}
              >
                rus
              </Link>
              <Link
                to='#ukrainian'
                onClick={() => selectLanguage('ukrainian')}
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
            hello, <b>{name}</b>!
          </span>
          <button className='btn logout' onClick={logoutHandle}>
            log out
          </button>
        </div>
      </nav>
    </header>
  );
};
