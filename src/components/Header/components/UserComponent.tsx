import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderLink } from '../../../components';
import { logout } from '../../../utils/firebase';
import { User } from '@firebase/auth-types';
import useShowMessage from '../../../hooks/useShowMessage';
import useMsg from '../../../hooks/useMsg';

interface IUserComponentProps {
  user: Partial<User> | null;
}

export const UserComponent: FC<IUserComponentProps> = ({ user }) => {
  const navigate = useNavigate();
  const showMessage = useShowMessage();
  const msg = useMsg();

  const logoutHandle = () => {
    logout();
    navigate('/');
    showMessage(msg.LOG_OUT_SUCCESS);
    sessionStorage.removeItem('authInfo');
    sessionStorage.removeItem('userName');
  };

  return (
    <>
      {user && (
        <>
          {location.pathname !== '/graphiql' && (
            <>
              <HeaderLink to='/graphiql' text='IDE' className='header-link' />
              <span className='link-sep'>/</span>
            </>
          )}
          <HeaderLink
            to='/'
            translationKey='logout'
            className='header-link'
            onClick={logoutHandle}
          />
        </>
      )}
    </>
  );
};
