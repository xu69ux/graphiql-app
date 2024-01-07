import { FC, Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { IconButton, AnimatedArrows } from '@components/index';
import { translations } from '@contexts/translations';
import { GRAPHQL_ENDPOINTS } from '@constants/constants';
import { IoCloseOutline } from 'react-icons/io5';
import { GoHistory } from 'react-icons/go';
import { LiaDiceSolid } from 'react-icons/lia';
import useLanguage from '@hooks/useLanguage';

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

    const handleCleanEndpoint = () => {
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
        <AnimatedArrows />
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
        <div className='endpoint-icons-wrap'>
          <IconButton
            className='random-endpoint'
            title={translations[language]?.titleEndpointRandom}
            onClick={handleRandomEndpoint}
          >
            <LiaDiceSolid />
          </IconButton>
          <IconButton
            className={`history ${isDisabled ? 'disabled' : ''}`}
            title={translations[language]?.titleEndpointHistory}
            onClick={setFromHistory}
            disabled={isDisabled}
          >
            <GoHistory />
          </IconButton>
          <IconButton
            className='clean-endpoint'
            title={translations[language]?.titleEndpointClean}
            onClick={handleCleanEndpoint}
          >
            <IoCloseOutline />
          </IconButton>
        </div>
      </div>
    );
  },
);
