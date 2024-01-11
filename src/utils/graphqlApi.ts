import axios from 'axios';

export const graphqlRequest = async (
  url: string,
  query: string,
  variables: object = {},
  headers: object = {},
) => {
  try {
    const result = await axios.post(
      'https://' + url,
      {
        query: query,
        variables: variables,
      },
      {
        headers: headers,
      },
    );

    return result.data;
  } catch (error) {
    throw new Error('GraphQL request failed');
  }
};
