import { FC } from 'react';
import { translations } from '../../../contexts/translations';
import useLanguage from '../../../hooks/useLanguage';

import '@styles/Greeting.css';

interface IGreetingProps {
  name?: string | null;
  isLoading: boolean;
}

export const Greeting: FC<IGreetingProps> = ({ name }) => {
  const { language } = useLanguage();

  return (
    <div className='greeting'>
      {name ? (
        <p>{`${translations[language]?.greeting}, ${name}!`}</p>
      ) : (
        <p>{`${translations[language]?.greeting}, ${translations[language]?.noName}!`}</p>
      )}
    </div>
  );
};
