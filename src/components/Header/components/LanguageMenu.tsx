import { useState, FC } from 'react';
import { translations } from '../../../contexts/translations';
import { IoEarthOutline } from 'react-icons/io5';
import { Fade } from '@components/index';
import useLanguage from '../../../hooks/useLanguage';

import '@styles/LanguageMenu.css';

interface ILanguageMenuProps {
  isScrolled: boolean;
}

export const LanguageMenu: FC<ILanguageMenuProps> = ({ isScrolled }) => {
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`lang-menu ${isScrolled ? 'scrolled' : ''}`}
      onClick={() => toggleDropdown(!isDropdownOpen)}
    >
      <IoEarthOutline
        className={`lang-icon ${isScrolled ? 'scrolled' : ''}`}
        title={translations[language]?.titleLanguage}
      />
      <Fade show={!isDropdownOpen}>
        <div className='lang-name'>{language}</div>
      </Fade>
      <Fade show={isDropdownOpen}>
        <div className='lang-dropdown'>
          <button
            onClick={() => {
              setLanguage('eng');
            }}
            className={language === 'eng' ? 'selected' : ''}
          >
            eng
          </button>
          <button
            onClick={() => {
              setLanguage('rus');
            }}
            className={language === 'rus' ? 'selected' : ''}
          >
            rus
          </button>
          <button
            onClick={() => {
              setLanguage('ukr');
            }}
            className={language === 'ukr' ? 'selected' : ''}
          >
            ukr
          </button>
        </div>
      </Fade>
    </div>
  );
};
