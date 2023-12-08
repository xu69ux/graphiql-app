import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '../firebase';
// import { updateProfile } from 'firebase/auth';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHEMA } from '../utils/validation/shema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Maybe } from 'yup';

import '@styles/AuthForm.css';

interface AuthFormProps {
  mode: 'login' | 'register';
}
interface IFormInput {
  username?: Maybe<string>;
  email: string;
  password: string;
}
export const AuthForm = ({ mode }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SCHEMA),
    mode: 'onChange',
  });

  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<IFormInput> = ({
    username,
    email,
    password,
  }) => {
    if (mode === 'register') {
      registerWithEmailAndPassword(username || '', email, password);
      // const user = auth.currentUser;
      // if (user) {
      //   updateProfile(user, { displayName: username });
      // }
    } else {
      console.log(email, password);
      logInWithEmailAndPassword(email, password);
    }
    navigate('/graphiql');
  };

  const renderRegister = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='register'>
          <div className='input-wrapper'>
            <input
              type='text'
              placeholder='username'
              {...register('username')}
            />
            <div className='error'>
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div
              className='strip left'
              style={{ width: `${usernameTooltipWidth + 20}px` }}
            ></div>

            <div className='tooltip username' ref={usernameTooltipRef}>
              please use any username
            </div>
          </div>
          <div className='input-wrapper'>
            <input type='text' placeholder='email' {...register('email')} />
            <div className='error'>
              {errors.email && <p>{errors.email.message}</p>}
            </div>
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
              {...register('password')}
            />
            <div className='error'>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div
              className='strip left'
              style={{ width: `${passwordTooltipWidth + 20}px` }}
            ></div>
            <div className='tooltip password' ref={passwordTooltipRef}>
              must be at least 8 characters
            </div>
          </div>
          <button className='btn reg' type='submit' disabled={isSubmitting}>
            Sign up
          </button>
        </div>
      </form>
    );
  };

  const renderLogin = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='login'>
          <div className='input-wrapper'>
            <input type='text' placeholder='email' {...register('email')} />
            <div className='error'>
              {errors.email && <p>{errors.email.message}</p>}
            </div>
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
              {...register('password')}
            />
            <div className='error'>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div
              className='strip left'
              style={{ width: `${passwordTooltipWidth + 20}px` }}
            ></div>
            <div ref={passwordTooltipRef} className='tooltip password'>
              please enter the password provided during registration
            </div>
          </div>
          <button className='btn log' type='submit' disabled={isSubmitting}>
            Log in
          </button>
        </div>
      </form>
    );
  };

  return <>{mode === 'register' ? renderRegister() : renderLogin()}</>;
};
