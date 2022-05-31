import {fetchAPI} from './global';

export const loginUser = async user => await fetchAPI('POST', 'login', {user});
export const signUpUser = async new_user =>
  await fetchAPI('POST', 'sign_up', new_user);

export const changePassword = async data =>
  await fetchAPI('POST', 'change_password', data);

export const resetPassword = async data =>
  await fetchAPI('POST', 'reset_password', data);

export const updateProfilePicture = async ({user_id, image}) =>
  await fetchAPI('POST', `users/${user_id}/profile_picture`, {image});

export const updateBoatDates = async ({user_id, user}) =>
  await fetchAPI('POST', `users/${user_id}/dates`, {user});
