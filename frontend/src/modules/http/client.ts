import { getFromStorage } from '../storage/io';

export const request = async (path: string, data?: object) => {
  const token = getFromStorage('accessToken');
  const response = await fetch(`http://localhost:5000${path}`, {
    method: data ? 'post' : 'get',
    headers: {
      'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
