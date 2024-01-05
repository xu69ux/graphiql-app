import axios from 'axios';

export const graphqlRequest = async (
  url: string,
  query: string,
  headers: object = {},
) => {
  const result = await axios.post(
    'https://' + url,
    {
      query: query,
    },
    {
      headers: headers,
    },
  );

  return result;
};
