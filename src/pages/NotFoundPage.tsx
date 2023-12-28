import { Link } from 'react-router-dom';
import { translations } from '../contexts/translations';
import { MEMES_URL } from '../constants';
import useLanguage from '../hooks/useLanguage';

import '@styles/NotFoundPage.css';

export const NotFoundPage = () => {
  const { language } = useLanguage();
  const randomMeme = MEMES_URL[Math.floor(Math.random() * MEMES_URL.length)];

  return (
    <div className='notfound-container'>
      <h1>{translations[language]?.notFoundTitle1}</h1>
      <h2>
        {translations[language]?.notFoundTitle2}
        <Link to='/' className='notfound-link'>
          {translations[language]?.mainPage}
        </Link>
        {translations[language]?.notFoundTitle3}
      </h2>
      <div className='meme-container'>
        <img src={randomMeme} alt='meme about garphQL' height={350} />
      </div>
    </div>
  );
};
