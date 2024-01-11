import { FC, memo, FocusEvent, useRef } from 'react';
import { IconButton, AnimatedArrows } from '@components/index';
import { translations } from '@contexts/translations';
import {
  GRAPHQL_ENDPOINTS,
  QUERY_FOR_SHEMA_FETCHING,
} from '@constants/constants';
import useLanguage from '@hooks/useLanguage';
import { graphqlRequest } from '@utils/graphqlApi';
import { GraphQLSchema } from '@appTypes/types';
import useLocalStorage from '@hooks/useLocalStorage';

import { IoCloseOutline } from 'react-icons/io5';
import { GoHistory } from 'react-icons/go';
import { LiaDiceSolid } from 'react-icons/lia';

import '@styles/Endpoint.css';

interface IEndpointProps {
  updateSchema: (schema: GraphQLSchema | null, clear?: boolean) => void;
}

export const Endpoint: FC<IEndpointProps> = memo(({ updateSchema }) => {
  const { language } = useLanguage();
  const { getItem, setItem, isLocalCleared } = useLocalStorage();
  const endpointInput = useRef<HTMLInputElement>(null);

  const saveEndpoint = (endpoint: string) => {
    setItem('prevEndpoint', endpoint);
  };

  const fetchShema = async (endpoint: string): Promise<void> => {
    updateSchema(null, true);
    if (!endpoint) {
      return;
    }
    try {
      const response = await graphqlRequest(endpoint, QUERY_FOR_SHEMA_FETCHING);
      updateSchema(response.data.__schema);
      saveEndpoint(endpoint);
    } catch (error) {
      console.error(error);
      updateSchema(null);
    }
  };

  const handleRandomEndpoint = () => {
    const randomEndpoint =
      GRAPHQL_ENDPOINTS[Math.floor(Math.random() * GRAPHQL_ENDPOINTS.length)];
    saveEndpoint(randomEndpoint);
    endpointInput.current!.value = randomEndpoint;
    fetchShema(randomEndpoint);
  };

  const setFromHistory = () => {
    const prevEndpoint = getItem('prevEndpoint');
    if (prevEndpoint && prevEndpoint !== endpointInput.current!.value) {
      endpointInput.current!.value = prevEndpoint;
      fetchShema(prevEndpoint);
    }
  };

  const handleCleanEndpoint = () => {
    endpointInput.current!.value = '';
    updateSchema(null, true);
  };

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
          ref={endpointInput}
          className='endpoint-input'
          name='endpoint'
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            fetchShema(event.target.value)
          }
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
          className={`history ${isLocalCleared ? 'disabled' : ''}`}
          title={translations[language]?.titleEndpointHistory}
          onClick={setFromHistory}
          disabled={isLocalCleared}
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
});
