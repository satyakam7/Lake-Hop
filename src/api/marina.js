import {fetchAPI} from './global';

export const getMarina = async ({marina_id}) => {
  return await fetchAPI('GET', `marinas/${marina_id}`);
};

export const getMarinas = async () => {
  return await fetchAPI('GET', 'marinas');
};
