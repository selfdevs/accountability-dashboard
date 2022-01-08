import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { request } from '../modules/http/client';
import { saveToStorage } from '../modules/storage/io';
import LoginButton from '../components/LoginButton/LoginButton';

const LOGIN_URL = 'https://discord.com/api/oauth2/authorize?client_id=927637722628259842&redirect_uri=https%3A%2F%2Fbig-donkey-12.loca.lt%2F&response_type=code&scope=identify%20email';

const Homepage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get('code');
    if (code) {
      request('/api/auth/discord', { code })
        .then(({ token }: { token: string }) => {
          saveToStorage('accessToken', token);
          navigate('/longlikeshort');
        });
    }
  }, [params, navigate]);

  return (
    <a href={LOGIN_URL}><LoginButton /></a>
  );
};

export default Homepage;
