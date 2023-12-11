import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.graphcdn.app/';

const QUERY = `query {
  character(id: 10) {
    name
  }
}`;

export const graphqlRequest = async () => {
  const res = await axios.post(BASE_URL, {
    query: QUERY,
  });

  console.log(res);
};
