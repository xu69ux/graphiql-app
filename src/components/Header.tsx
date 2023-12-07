import { Link } from 'react-router-dom';
import { IoEarthOutline } from 'react-icons/io5';

import '@styles/Header.css';

export const Header = () => {
  const username = 'user';
  const logOut = () => {
    console.log('log out');
  };

  return (
    <header className='header'>
      <Link to='/' className='welcome-link'>
        <div className='logo'>GraphQL IDE</div>
      </Link>
      <nav>
        <div className='user'>
          <span>
            hello, <b>{username}</b>!
          </span>
          <IoEarthOutline className='lang-icon' />
          <button className='btn logout' onClick={logOut}>
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};
