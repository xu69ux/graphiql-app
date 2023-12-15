import { FC } from 'react';

import { IoChevronForward } from 'react-icons/io5';

import '@styles/Endpoint.css';

interface IEndpointProps {
  endpointValue: string;
}

export const Endpoint: FC<IEndpointProps> = ({ endpointValue }) => {
  return (
    <div className='endpoint'>
      <div className='endpoint-wrap'>
        <label className='endpoint-label' htmlFor='endpoint'>
          Endpoint
        </label>
        <div className='arrows'>
          <IoChevronForward />
          <IoChevronForward />
          <IoChevronForward />
        </div>
        <div className='input-wrap'>
          <span className='http'>http://</span>
          <input
            type='text'
            className='endpoint-input'
            name='endpoint'
            value={endpointValue}
          />
        </div>
      </div>
    </div>
  );
};
