import { translations } from '../../contexts/translations';
import { Loader } from '../../components';
import useLanguage from '../../hooks/useLanguage';

import '@styles/Greeting.css';

export const Greeting = ({ name, isLoading }) => {
  const { language } = useLanguage();

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
