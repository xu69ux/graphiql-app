import { FC } from 'react';
import { translations } from '../../../contexts/translations';
import { Loader } from '../..';
import useLanguage from '../../../hooks/useLanguage';

import '@styles/Greeting.css';

interface IGreetingProps {
  name?: string;
  isLoading: boolean;
}

export const Greeting: FC<IGreetingProps> = ({ name, isLoading }) => {
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
