import React, {
  createContext, FC, useCallback, useContext, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromStorage } from '../modules/storage/io';
import { request } from '../modules/http/client';
import { User } from '../entities/User';

export const AuthContext = createContext<User | undefined>(undefined);

enum Status {
  PENDING,
  VISITOR,
  LOGGED,
}

const routes = {
  '/me': Status.LOGGED,
};

const Auth: FC = ({ children }) => {
  const [, setStatus] = useState<Status>(Status.PENDING);
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleVisitor = useCallback(() => {
    setStatus(Status.VISITOR);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (routes[pathname] > Status.VISITOR) {
      const token = getFromStorage('accessToken');
      if (!token) {
        handleVisitor();
      }
      request('/user').then((data) => {
        setUser(data);
        setStatus(Status.LOGGED);
      }).catch(() => {
        handleVisitor();
      });
    }
  }, [navigate, pathname]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);

export default Auth;
