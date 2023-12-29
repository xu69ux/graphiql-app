import { FC, Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { translations } from '../contexts/translations';
import { IoChevronForward } from 'react-icons/io5';
import { LiaHistorySolid } from 'react-icons/lia';
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

    const setFromHistory = () => {
      const prevEndpoint = localStorage.getItem('prevEndpoint');
      if (prevEndpoint) {
        setEndpoint(prevEndpoint);
      }
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
        <button
          className={`history ${isDisabled ? 'disabled' : ''}`}
          title={translations[language]?.titleEndpointHistory}
          onClick={setFromHistory}
          disabled={isDisabled}
        >
          <LiaHistorySolid />
        </button>
      </div>
    );
  },
);
