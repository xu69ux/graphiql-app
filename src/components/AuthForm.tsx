import { useState, useRef, useEffect } from 'react';

import '@styles/AuthForm.css';

interface AuthFormProps {
  mode: 'login' | 'register';
}
export const AuthForm = ({ mode }: AuthFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(username, email, password);

  const usernameTooltipRef = useRef<HTMLDivElement>(null);
  const emailTooltipRef = useRef<HTMLDivElement>(null);
  const passwordTooltipRef = useRef<HTMLDivElement>(null);
  const [usernameTooltipWidth, setUsernameTooltipWidth] = useState(0);
  const [emailTooltipWidth, setEmailTooltipWidth] = useState(0);
  const [passwordTooltipWidth, setPasswordTooltipWidth] = useState(0);

  useEffect(() => {
    if (usernameTooltipRef.current) {
      setUsernameTooltipWidth(usernameTooltipRef.current.offsetWidth);
    }
    if (emailTooltipRef.current) {
      setEmailTooltipWidth(emailTooltipRef.current.offsetWidth);
    }
    if (passwordTooltipRef.current) {
      setPasswordTooltipWidth(passwordTooltipRef.current.offsetWidth);
    }
  }, []);

  const handleAuth = async () => {};

  const renderRegister = () => {
    return (
      <div className='register'>
        <div className='input-wrapper'>
          <input
            type='text'
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <div
            className='strip left'
            style={{ width: `${usernameTooltipWidth + 20}px` }}
          ></div>

          <div className='tooltip username' ref={usernameTooltipRef}>
            please use any username
          </div>
        </div>
        <div className='input-wrapper'>
          <input
            type='text'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className='strip right'
            style={{ width: `${emailTooltipWidth + 20}px` }}
          ></div>
          <div className='tooltip email' ref={emailTooltipRef}>
            please use any real or fake email
          </div>
        </div>
        <div className='input-wrapper'>
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className='strip left'
            style={{ width: `${passwordTooltipWidth + 20}px` }}
          ></div>
          <div className='tooltip password' ref={passwordTooltipRef}>
            must be at least 8 characters
          </div>
        </div>

        <button className='btn reg' onClick={handleAuth}>
          Sign up
        </button>
      </div>
    );
  };

  const renderLogin = () => {
    return (
      <div className='login'>
        <div className='input-wrapper'>
          <input
            type='text'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className='strip right'
            style={{ width: `${emailTooltipWidth + 20}px` }}
          ></div>
          <div ref={emailTooltipRef} className='tooltip email'>
            please enter the email provided during registration
          </div>
        </div>
        <div className='input-wrapper'>
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className='strip left'
            style={{ width: `${passwordTooltipWidth + 20}px` }}
          ></div>
          <div ref={passwordTooltipRef} className='tooltip password'>
            please enter the password provided during registration
          </div>
        </div>
        <button className='btn log' onClick={handleAuth}>
          Log in
        </button>
      </div>
    );
  };

  return <>{mode === 'register' ? renderRegister() : renderLogin()}</>;
};
