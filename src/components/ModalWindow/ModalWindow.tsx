import { FC } from 'react';
import { useContext } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { IconButton, ModalWindowSettings } from '@components/index';
import { ThemeContext } from '@contexts/ThemeContext';
import { translations } from '@contexts/translations';
import useLanguage from '@hooks/useLanguage';
import useShowMessage from '@hooks/useShowMessage';
import useMsg from '@hooks/useMsg';

import '@styles/ModalWindow.css';

interface IModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWindow: FC<IModalWindowProps> = ({ isOpen, onClose }) => {
  const showMessage = useShowMessage();
  const msg = useMsg();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLocalClear = () => {
    localStorage.clear();
    showMessage(msg.LOCAL_STORAGE_CLEAR_SUCCESS);
  };

  const toggleLanguage = () => {
    const newLanguage =
      language === 'eng' ? 'rus' : language === 'rus' ? 'ukr' : 'eng';
    setLanguage(newLanguage);
  };

  return isOpen ? (
    <div className='modal-overlay'>
      <div className='modal-window' data-testid='modal-window'>
        <IconButton
          className='modal-icon close'
          title={translations?.[language].titleCloseModal}
          onClick={onClose}
        >
          <IoCloseOutline />
        </IconButton>
        <div className='modal-content'>
          <h3>{translations?.[language].settings}</h3>
          <ModalWindowSettings
            theme={theme}
            language={language}
            onThemeToggle={toggleTheme}
            onLanguageToggle={toggleLanguage}
            onLocalClear={handleLocalClear}
          />
        </div>
      </div>
    </div>
  ) : null;
};
