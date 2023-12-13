import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from '../firebase';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchema } from '../utils/validation/shema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { translations } from '../contexts/translations';
import { LanguageContext } from '../contexts/LanguageContext';
import { PasswordValidIndicator } from '../components';

import '@styles/AuthForm.css';

interface AuthFormProps {
  mode: 'login' | 'register';
}
interface IFormInput {
  username?: string | null;
  email: string;
  password: string;
}
export const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(getSchema(language)),
    mode: 'onChange',
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/graphiql');
  }, [user, loading, navigate]);

  const onSubmit: SubmitHandler<IFormInput> = ({
    username,
    email,
    password,
  }) => {
    if (mode === 'register') {
      registerWithEmailAndPassword(username || '', email, password);
    } else {
      logInWithEmailAndPassword(email, password);
    }
  };

  const password = watch('password', '');

  const renderRegister = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='register'>
          <div className='input-wrapper'>
            <input
              type='text'
              placeholder={translations?.[language]?.username}
              {...register('username')}
            />
          </div>
          <div className='error'>
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className='input-wrapper'>
            <input
              type='text'
              placeholder={translations?.[language]?.email}
              {...register('email')}
            />
          </div>
          <div className='error'>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className='input-wrapper'>
            <input
              type='password'
              value={password}
              placeholder={translations?.[language]?.password}
              {...register('password')}
            />
          </div>
          <PasswordValidIndicator password={password} />
          <div className='error'>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className='btn reg' type='submit' disabled={isSubmitting}>
            {translations?.[language]?.signupTitle}
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
            <input
              type='text'
              placeholder={translations?.[language]?.email}
              {...register('email')}
            />
          </div>
          <div className='error'>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className='input-wrapper'>
            <input
              type='password'
              value={password}
              placeholder={translations?.[language]?.password}
              {...register('password')}
            />
          </div>
          <PasswordValidIndicator password={password} />
          <div className='error'>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button className='btn log' type='submit' disabled={isSubmitting}>
            {translations?.[language]?.loginTitle}
          </button>
        </div>
      </form>
    );
  };

  return <>{mode === 'register' ? renderRegister() : renderLogin()}</>;
};
