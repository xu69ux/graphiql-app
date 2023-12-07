import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

import '@styles/WelcomePage.css';

export const WelcomePage = () => {
  return (
    <div className='welcome-container'>
      <h1 className='welcome-title'>GraphiQL IDE</h1>
      <p className='typing-effect'>
        to use this awesome application, please log in with a fake email
      </p>
      <div className='welcome-auth'>
        <div className='login-icon'>
          <IoChevronForward />
          <IoChevronForward />
          <IoChevronForward />
        </div>
        <Link to='/login' className='welcome-link'>
          log in
        </Link>
        <span>or</span>
        <Link to='/signup' className='welcome-link'>
          sign up
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
