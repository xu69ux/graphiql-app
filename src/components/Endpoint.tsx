import { FC, Dispatch, SetStateAction, memo } from 'react';

import { IoChevronForward } from 'react-icons/io5';
import { LiaHistorySolid } from 'react-icons/lia';

import '@styles/Endpoint.css';

interface IEndpointProps {
  endpointValue: string;
  setEndpoint: Dispatch<SetStateAction<string>>;
  fetchShema: () => void;
}

export const Endpoint: FC<IEndpointProps> = memo(
  ({ endpointValue, setEndpoint, fetchShema }) => {
    const setFromHistory = () => {
      const prevEndpoint = localStorage.getItem('prevEndpoint');
      if (prevEndpoint) {
        setEndpoint(prevEndpoint);
      }
    };
    return (
      <div className='endpoint'>
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
          />
        </div>
        <button
          className='history'
          title='use previous endpoint'
          onClick={setFromHistory}
        >
          <LiaHistorySolid />
        </button>
      </div>
    );
  },
);
