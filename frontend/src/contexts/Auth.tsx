import React, {
  createContext,
  FC, useCallback, useEffect, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromStorage } from '../modules/storage/io';
import { request } from '../modules/http/client';

const AuthContext = createContext(null);

enum Status {
  PENDING,
  VISITOR,
  LOGGED,
}

const routes = {
  '/longlikeshort': Status.LOGGED,
};

const Auth: FC = ({ children }) => {
  const [, setStatus] = useState<Status>(Status.PENDING);
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
      request('/api/user').then(() => {
        setStatus(Status.LOGGED);
      }).catch(() => {
        handleVisitor();
      });
    }
  }, [navigate, pathname]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export default Auth;
