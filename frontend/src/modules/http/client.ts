import { getFromStorage } from '../storage/io';

export const request = async (path: string, method?: string, data?: object) => {
  const token = getFromStorage('accessToken');
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${path}`, {
    method: method || 'get',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
  if (!response.ok) throw Error('Error');

  return response.json();
};
