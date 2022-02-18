export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const saveRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const saveAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};
