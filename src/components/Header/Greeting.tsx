import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { translations } from '../../contexts/translations';
import { Loader } from '..';

import '@styles/Greeting.css';

export const Greeting = ({ name, isLoading }) => {
  const languageContext = useContext(LanguageContext) || {
    language: 'eng',
    setLanguage: () => {},
  };
  const { language } = languageContext;

  return (
    <div className='greeting'>
      {isLoading ? (
        <Loader />
      ) : name ? (
        <p>{`${translations[language]?.greeting}, ${name}!`}</p>
      ) : (
        <p>{`${translations[language]?.greeting}, ${translations[language]?.noName}!`}</p>
      )}
    </div>
  );
};
