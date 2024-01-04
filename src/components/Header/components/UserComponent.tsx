import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderLink } from '../../../components';
import { logout } from '../../../utils/firebase';
import useShowMessage from '../../../hooks/useShowMessage';
import useMsg from '../../../hooks/useMsg';

export const UserComponent: FC = () => {
  const navigate = useNavigate();
  const showMessage = useShowMessage();
  const msg = useMsg();

  const logoutHandle = (event: React.MouseEvent) => {
    event.preventDefault();
    logout();
    navigate('/');
    showMessage(msg.LOG_OUT_SUCCESS);
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('authInfo');
  };

  return (
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
        onClick={(event) => logoutHandle(event)}
      />
    </>
  );
};
