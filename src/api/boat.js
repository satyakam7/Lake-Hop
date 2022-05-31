import {fetchAPI} from './global';

export const createBoat = async ({boat}) =>
  await fetchAPI('POST', 'boats', {boat});

export const updateBoat = async ({boat_id, boat}) =>
  await fetchAPI('PATCH', `boats/${boat_id}`, {boat});

export const updateBoatImage = async ({boat_id, image, image_type}) =>
  await fetchAPI('POST', `boats/${boat_id}/images`, {image, image_type});

export const updateBoatLocations = async ({boat_id, marinas}) =>
  await fetchAPI('POST', `boats/${boat_id}/locations`, {marinas});

export const getBoat = async ({boat_id}) =>
  await fetchAPI('GET', `boats/${boat_id}`);

export const getBoats = async filters => {
  let params = '';
  Object.keys(filters).map(
    filter => (params += filter + '=' + filters[filter] + '&'),
  );
  return await fetchAPI('GET', `boats/search?${params}`);
};

export const getMyBoats = async () => await fetchAPI('GET', 'boats');

export const getBoatTimes = async ({boat_id, date}) =>
  await fetchAPI('GET', `boats/${boat_id}/times?date=${date}`);

export const getBookmarks = async () => await fetchAPI('GET', 'bookmarks');

export const createBookmark = async ({boat_id}) =>
  await fetchAPI('POST', 'bookmarks', {
    bookmark: {
      boat_id,
    },
  });

export const destroyBookmark = async ({boat_id}) =>
  await fetchAPI('DELETE', `bookmarks/${boat_id}`);
