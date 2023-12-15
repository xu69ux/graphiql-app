import { FC } from 'react';

import '@styles/Endpoint.css';

interface IEndpointProps {
  endpointValue: string;
}

export const Endpoint: FC<IEndpointProps> = ({ endpointValue }) => {
  return (
    <div className='endpoint'>
      <label className='label' htmlFor='endpoint'>
        Endpoint
      </label>
      <div className='endpoint-wrap'>
        <span className='http'>http://</span>
        <input
          type='text'
          className='endpoint'
          name='endpoint'
          value={endpointValue}
        />
      </div>
    </div>
  );
};
