import { FC } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { IoCloseOutline } from 'react-icons/io5';

import '@styles/Modal.css';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<IModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-window'>
        <button onClick={onClose} className='modal-btn close'>
          <IoCloseOutline className='modal-icon close' />
        </button>
        <div className='modal-content'>
          <h3>Settings</h3>
          <div className='settings'>
            <div className='theme'>
              <h4>Theme Change:</h4>
              <button className='theme-btn' onClick={toggleTheme}>
                {theme}
              </button>
            </div>
            <div className='local'>
              <h4>Local Storage:</h4>
              <button
                className='local-btn'
                onClick={() => localStorage.clear()}
              >
                clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
