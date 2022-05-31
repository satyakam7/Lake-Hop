import {fetchAPI} from './global';

export const searchLakes = async ({term}) => {
  return await fetchAPI('GET', `lakes/search?term=${term}`);
};
