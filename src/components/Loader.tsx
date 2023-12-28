import { RiLoader4Fill } from 'react-icons/ri';
import '@styles/Loader.css';

export const Loader = () => {
  return (
    <div className='loader'>
      <RiLoader4Fill className='loader-icon' />
    </div>
  );
};
