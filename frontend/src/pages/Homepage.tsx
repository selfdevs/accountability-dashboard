import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { request } from '../modules/http/client';
import { saveToStorage } from '../modules/storage/io';
import LoginButton from '../components/LoginButton/LoginButton';
import { useNotify } from '../contexts/Notification';
import { useRefresh, useUser } from '../contexts/Auth';

const LOGIN_URL = `https://discord.com/api/oauth2/authorize?client_id=927637722628259842&redirect_uri=${encodeURIComponent(
  process.env.REACT_APP_REDIRECT_URI
)}&response_type=code&scope=identify%20email`;

const Homepage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const notify = useNotify();
  const refresh = useRefresh();
  const user = useUser();

  useEffect(() => {
    if (user) {
      navigate('/me');
    }
  }, [user]);

  useEffect(() => {
    const code = params.get('code');
    if (code) {
      request('/auth/discord', 'POST', { code })
        .then(({ token }: { token: string }) => {
          saveToStorage('accessToken', token);
          refresh();
        })
        .catch((e) => {
          notify(e.message);
        });
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
