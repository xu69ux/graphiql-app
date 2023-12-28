import { useState } from 'react';
import { translations } from '../../contexts/translations';
import { IoEarthOutline } from 'react-icons/io5';
import { Fade } from '../../components';
import useLanguage from 'src/hooks/useLanguage';

import '@styles/LanguageMenu.css';

export const LanguageMenu = ({ isScrolled }) => {
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
