import { FC, Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { IconButton } from './IconButton';
import { translations } from '../contexts/translations';
import { GRAPHQL_ENDPOINTS } from '../constants';
import { IoChevronForward, IoCloseOutline } from 'react-icons/io5';
import { LiaHistorySolid } from 'react-icons/lia';
import { LuPenLine } from 'react-icons/lu';
import useLanguage from '../hooks/useLanguage';

import '@styles/Endpoint.css';

interface IEndpointProps {
  endpointValue: string;
  setEndpoint: Dispatch<SetStateAction<string>>;
  fetchShema: () => void;
}

export const Endpoint: FC<IEndpointProps> = memo(
  ({ endpointValue, setEndpoint, fetchShema }) => {
    const { language } = useLanguage();
    const [isDisabled, setIsDisabled] = useState(true);

    const handleRandomEndpoint = () => {
      const randomEndpoint =
        GRAPHQL_ENDPOINTS[Math.floor(Math.random() * GRAPHQL_ENDPOINTS.length)];
      setEndpoint(randomEndpoint);
    };

    const setFromHistory = () => {
      const prevEndpoint = localStorage.getItem('prevEndpoint');
      if (prevEndpoint) {
        setEndpoint(prevEndpoint);
      }
    };

    const handleEndpointClean = () => {
      setEndpoint('');
    };

    useEffect(() => {
      const prevEndpoint = localStorage.getItem('prevEndpoint');
      setIsDisabled(!prevEndpoint);
    }, []);

    return (
      <div className='endpoint' data-testid='endpoint'>
        <label className='endpoint-label' htmlFor='endpoint'>
          Endpoint
        </label>
        <div className='arrows'>
          <IoChevronForward />
          <IoChevronForward />
          <IoChevronForward />
        </div>
        <div className='input-wrap'>
          <span className='http'>https://</span>
          <input
            type='text'
            className='endpoint-input'
            name='endpoint'
            value={endpointValue}
            onChange={(e) => {
              setEndpoint(e.target.value);
            }}
            onBlur={fetchShema}
            data-testid='endpoint-input'
          />
        </div>
        <IconButton
          className='random-endpoint'
          title={translations[language]?.titleEndpointRandom}
          onClick={handleRandomEndpoint}
        >
          <LuPenLine />
        </IconButton>
        <IconButton
          className={`history ${isDisabled ? 'disabled' : ''}`}
          title={translations[language]?.titleEndpointHistory}
          onClick={setFromHistory}
          disabled={isDisabled}
        >
          <LiaHistorySolid />
        </IconButton>
        <IconButton
          className='clean-endpoint'
          title={translations[language]?.titleEndpointClean}
          onClick={handleEndpointClean}
        >
          <IoCloseOutline />
        </IconButton>
      </div>
    );
  },
);
