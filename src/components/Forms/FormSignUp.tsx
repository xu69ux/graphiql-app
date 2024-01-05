import { auth, registerWithEmailAndPassword } from '../../utils/firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchema } from '../../utils/validation/schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { translations } from '../../contexts/translations';
import { CustomButton, PasswordValidIndicator } from '../../components';
import useMsg from '../../hooks/useMsg';
import useLanguage from '../../hooks/useLanguage';
import useShowMessage from '../../hooks/useShowMessage';

import '@styles/Form.css';

interface IFormSignUp {
  username?: string | null;
  email: string;
  password: string;
}
export const FormSignUp = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const showMessage = useShowMessage();
  const { language } = useLanguage();
  const schema = getSchema(language);
  const msg = useMsg();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, isValid },
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

  const onSubmit: SubmitHandler<IFormSignUp> = async ({
    username,
    email,
    password,
  }) => {
    try {
      const response: string | undefined = await registerWithEmailAndPassword(
        username || '',
        email,
        password,
      );
      if (response !== 'success') {
        throw new Error('auth/email-already-in-use');
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
  const showSubmitMessage = () => {
    if (!isValid) {
      showMessage(msg.EMPTY_FIELDS_SUBMIT);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='signup'>
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
          className='btn btn-sign'
          type='submit'
          disabled={isSubmitting}
          title={translations?.[language]?.signupTitle}
          onClick={showSubmitMessage}
        />
      </div>
    </form>
  );
};
