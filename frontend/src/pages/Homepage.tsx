import React, { useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { request } from '../modules/http/client';
import { saveToStorage } from '../modules/storage/io';
import LoginButton from '../components/LoginButton/LoginButton';
import { useNotify } from '../contexts/Notification';
import { useRefresh, useUser } from '../contexts/Auth';
import Button from '../components/Button/Button';
import { User } from '../entities/User';
import Avatar from '../components/Avatar/Avatar';
import './homepage.css';

const LOGIN_URL = `https://discord.com/api/oauth2/authorize?client_id=927637722628259842&redirect_uri=${encodeURIComponent(
  process.env.REACT_APP_REDIRECT_URI
)}&response_type=code&scope=identify%20email`;

const Homepage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const notify = useNotify();
  const refresh = useRefresh();
  const user = useUser();
  const [users, setUsers] = React.useState<User[]>([]);

  useEffect(() => {
    request('/user').then((res) => {
      setUsers(res.reverse());
    });
  }, []);

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

  return !user ? (
    <LoginButton
      onClick={() => {
        window.location.href = LOGIN_URL;
      }}
    />
  ) : (
    <div className="homepage-users-container">
      <Button onClick={() => navigate('/me')}>Go to my dashboard</Button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {users.map(({ discordId, discordAvatar, _id: id, username }) => (
          <NavLink to={`/${username}`} key={id} className="homepage-user-link">
            <Avatar
              discordAvatar={discordAvatar}
              discordId={discordId}
              width="64px"
              heigth="64px"
            />
            {username}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
