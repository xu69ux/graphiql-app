import { useContext } from 'react';
import { translations } from '../contexts/translations';

import { LanguageContext } from '../contexts/LanguageContext';

import { PiGithubLogoFill } from 'react-icons/pi';
import courseLogo from '../assets/rs_school_js.svg';

import '@styles/Footer.css';

export const Footer = () => {
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  return (
    <footer className='footer'>
      <div className='footer-course'>
        <a href='https://rs.school/react/' className='course-link'>
          <img src={courseLogo} alt='rs school logo' className='course-logo' />
        </a>
      </div>
      <div className='footer-text'>
        <div className='made-with'>
          {translations[language]?.madeWith} <span>❤️</span>{' '}
        </div>
        <a className='repo-link' href='https://github.com/xu69ux/graphiql-app'>
          {translations[language]?.by} <b>JS do IT,</b>
        </a>
        <div className='year'>2023</div>
      </div>
      <div className='footer-icons'>
        <a
          href='https://github.com/xu69ux'
          className='iconDiv'
          data-tooltip='xu'
          tabIndex={0}
          target='_blank'
        >
          <div className='iconSVG'>
            <PiGithubLogoFill />
          </div>
        </a>
        <a
          href='https://github.com/dbox7'
          className='iconDiv'
          data-tooltip='dbox7'
          tabIndex={0}
          target='_blank'
        >
          <div className='iconSVG'>
            <PiGithubLogoFill />
          </div>
        </a>
        <a
          href='https://github.com/GEKKO-ops'
          className='iconDiv'
          data-tooltip='gekko'
          tabIndex={0}
          target='_blank'
        >
          <div className='iconSVG'>
            <PiGithubLogoFill />
          </div>
        </a>
      </div>
    </footer>
  );
};
