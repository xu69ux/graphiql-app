import axios from 'axios';

export const graphqlRequest = async (
  url: string,
  query: string,
  headers: object = {},
) => {
  try {
    const result = await axios.post(
      'https://' + url,
      {
        query: query,
      },
      {
        headers: headers,
      },
    );

    return result.data;
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Unexpected error during GraphQL request:', error);
    }
    throw new Error('GraphQL request failed');
  }
};
