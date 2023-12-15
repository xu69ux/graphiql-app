import axios from 'axios';

// const BASE_URL = 'https://rickandmortyapi.graphcdn.app/';

export const graphqlRequest = async (
  url: string,
  query: string,
  headers: object = {},
) => {
  const fullURL = 'https://' + url;
  const result = await axios.post(
    fullURL,
    {
      query: query,
    },
    {
      headers: headers,
    },
  );

  return result;
};
