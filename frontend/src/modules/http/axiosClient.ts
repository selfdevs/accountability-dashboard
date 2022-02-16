import axios, { AxiosRequestConfig } from 'axios';

import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '../storage/io';

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

interface RequestConfig extends AxiosRequestConfig {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const addAccessToken = (accessToken: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const removeAccessToken = () => {
  delete instance.defaults.headers.common.Authorization;
};

instance.interceptors.request.use((config: RequestConfig) => {
  const token = getAccessToken();
  const newConfig = config;
  newConfig.headers.Authorization = `Bearer ${token}`;
  newConfig.headers['Content-Type'] = 'application/json';
  return newConfig;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        return instance
          .post(`/auth/token`, {
            token: refreshToken,
          })
          .then(({ data }) => {
            removeAccessToken();
            saveRefreshToken((data as TokenResponse).refreshToken);
            saveAccessToken((data as TokenResponse).accessToken);
            addAccessToken((data as TokenResponse).accessToken);
            return instance(originalRequest);
          });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
