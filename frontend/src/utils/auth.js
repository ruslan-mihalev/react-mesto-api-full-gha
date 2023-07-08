import { BASE_AUTH_URL } from './hosts';

export const register = (email, password) => {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_AUTH_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    });
};

export const signout = () => {
  return fetch(`${BASE_AUTH_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    });
};
