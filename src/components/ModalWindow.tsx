import { FC } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@contexts/ThemeContext';
import { IoCloseOutline } from 'react-icons/io5';
import { translations } from '@contexts/translations';
import useLanguage from '@hooks/useLanguage';
import useShowMessage from '@hooks/useShowMessage';
import useMsg from '@hooks/useMsg';

import '@styles/ModalWindow.css';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<IModalProps> = ({ isOpen, onClose }) => {
  const showMessage = useShowMessage();
  const msg = useMsg();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!isOpen) return null;

  const handleLocalClear = () => {
    localStorage.clear();
    showMessage(msg.LOCAL_STORAGE_CLEAR_SUCCESS);
  };

  const toggleLanguage = () => {
    const newLanguage =
      language === 'eng' ? 'rus' : language === 'rus' ? 'ukr' : 'eng';
    setLanguage(newLanguage);
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-window'>
        <button onClick={onClose} className='modal-btn close'>
          <IoCloseOutline
            className='modal-icon close'
            title={translations?.[language].titleCloseModal}
          />
        </button>
        <div className='modal-content'>
          <h3>{translations?.[language].settings}</h3>
          <div className='settings'>
            <div className='theme'>
              <h4>{translations?.[language].themeChange}:</h4>
              <button className='theme-btn' onClick={toggleTheme}>
                {theme}
              </button>
            </div>
            <div className='language'>
              <h4>{translations?.[language].languageChange}:</h4>
              <button className='language-btn' onClick={toggleLanguage}>
                {language}
              </button>
            </div>
            <div className='local'>
              <h4>{translations?.[language].localStorage}:</h4>
              <button className='local-btn' onClick={handleLocalClear}>
                {translations?.[language].clear}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
