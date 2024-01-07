import axios from 'axios';
import { graphqlRequest } from '@utils/graphqlApi';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('graphqlRequest', () => {
  it('sends a request and returns the response data', async () => {
    const url = 'test.com';
    const query = '{ test }';
    const headers = { 'Content-Type': 'application/json' };
    const responseData = { data: { test: 'test data' } };

    mockedAxios.post.mockResolvedValueOnce({ data: responseData });

    const result = await graphqlRequest(url, query, headers);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `https://${url}`,
      { query },
      { headers },
    );

    expect(result).toEqual(responseData);
  });

  it('throws an error when the request fails', async () => {
    const url = 'test.com';
    const query = '{ test }';
    const headers = { 'Content-Type': 'application/json' };

    mockedAxios.post.mockRejectedValueOnce(new Error('Request failed'));

    await expect(graphqlRequest(url, query, headers)).rejects.toThrow(
      'GraphQL request failed',
    );
  });
});
