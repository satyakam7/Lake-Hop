import {ConstantStore, tenMinFromNow} from '../functions';
import {BASE_URI} from '../constants';

const refreshToken = async () => {
  const method = 'GET';
  const tokenExpires = new Date(await ConstantStore.getItem('tokenExpires'));
  const authToken = await ConstantStore.getItem('authToken');
  const now = new Date();
  if (tokenExpires && now > tokenExpires) {
    let res = await fetch(`${BASE_URI}refresh_token`, {
      method,
      headers: {
        Authorization: 'Bearer ' + authToken,
        // 'X-CSRF-Token': this.railsToken,
        'Content-Type': 'application/json',
      },
    });
    res = await res.json();
    if (!res.error) {
      await ConstantStore.setItem('authToken', res.auth_token);
      await ConstantStore.setItem('tokenExpires', tenMinFromNow());
    }
  }
};

export const fetchAPI = async (method, url, body = null) => {
  await refreshToken();
  const authToken = await ConstantStore.getItem('authToken');
  const params =
    body != null
      ? {
          method,
          headers: {
            Authorization: 'Bearer ' + authToken,
            // 'X-CSRF-Token': this.railsToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      : {
          method,
          headers: {
            Authorization: 'Bearer ' + authToken,
            // 'X-CSRF-Token': this.railsToken,
            'Content-Type': 'application/json',
          },
        };

  return fetch(BASE_URI + url, params).then(res => res.json());
};
