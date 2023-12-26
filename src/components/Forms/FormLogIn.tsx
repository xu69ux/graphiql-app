import { auth, logInWithEmailAndPassword } from '../../utils/firebase';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchema } from '../../utils/validation/schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import useShowMessage from '../../hooks/useShowMessage';
import { translations } from '../../contexts/translations';
import { LanguageContext } from '../../contexts/LanguageContext';
import { PasswordValidIndicator } from '..';
import useMsg from '../../hooks/useMsg';
import { CustomButton } from '../../components';

import '@styles/Form.css';

interface IFormLogIn {
  email: string;
  password: string;
}
export const FormLogIn = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const showMessage = useShowMessage();
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;
  const schema = getSchema(language);
  const msg = useMsg();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/graphiql');
      sessionStorage.setItem('authInfo', 'userIs');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    trigger();
  }, [language, trigger]);

  const onSubmit: SubmitHandler<IFormLogIn> = async ({ email, password }) => {
    try {
      const response: string | undefined = await logInWithEmailAndPassword(
        email,
        password,
      );
      if (response !== 'success') {
        throw new Error('auth/invalid-credential');
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'auth/email-already-in-use':
            showMessage(msg.REG_ALREADY_EXIST);
            break;
          case 'auth/invalid-credential':
            showMessage(msg.LOGIN_USER_NOT_FOUND);
            break;
          default:
            showMessage(msg.COMMON_ERROR);
            break;
        }
      }
    }
  };

  const password = watch('password', '');

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
          {errors.email &&
            (touchedFields.email || errors.email.type !== 'required') && (
              <p>{errors.email.message}</p>
            )}
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
          {errors.password &&
            (touchedFields.password || errors.password.type !== 'required') && (
              <p>{errors.password.message}</p>
            )}
        </div>
        <CustomButton
          className='btn btn-log'
          type='submit'
          disabled={isSubmitting}
          title={translations?.[language]?.loginTitle}
          data-testid='login-button'
        />
      </div>
    </form>
  );
};
