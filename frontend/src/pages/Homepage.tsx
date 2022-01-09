import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { request } from '../modules/http/client';
import { saveToStorage } from '../modules/storage/io';
import LoginButton from '../components/LoginButton/LoginButton';

const LOGIN_URL = `https://discord.com/api/oauth2/authorize?client_id=927637722628259842&redirect_uri=${encodeURIComponent(
  process.env.REACT_APP_REDIRECT_URI
)}&response_type=code&scope=identify%20email`;

const Homepage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get('code');
    if (code) {
      request('/auth/discord', 'POST', { code }).then(
        ({ token }: { token: string }) => {
          saveToStorage('accessToken', token);
          navigate('/me');
        }
      );
    }
  }, [params, navigate]);

  return (
    <LoginButton
      onClick={() => {
        window.location.href = LOGIN_URL;
      }}
    />
  );
};

export default Homepage;
