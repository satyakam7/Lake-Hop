import {fetchAPI} from './global';

export const createBooking = async ({booking}) => {
  return await fetchAPI('POST', 'bookings', {booking});
};

export const updateBooking = async ({hosting, booking_id, booking}) => {
  return await fetchAPI('PATCH', `bookings/${booking_id}`, {booking, hosting});
};

export const getBooking = async ({hosting, booking_id}) => {
  return await fetchAPI('GET', `bookings/${booking_id}?hosting=${hosting}`);
};

export const getBookings = async ({hosting, profile_id = null}) => {
  let params = `hosting=${hosting}`;
  if (profile_id) params += '&profile_id=' + profile_id;

  return await fetchAPI('GET', `bookings?${params}`);
};
