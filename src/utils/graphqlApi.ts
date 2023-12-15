import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.graphcdn.app/';

export const graphqlRequest = async (query: string, headers: object = {}) => {
  const res = await axios.post(
    BASE_URL,
    {
      query: query,
    },
    {
      headers: headers,
    },
  );

  return res;
};
