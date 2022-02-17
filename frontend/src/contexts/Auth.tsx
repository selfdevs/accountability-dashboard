import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../entities/User';
import axiosInstance from '../modules/http/axiosClient';
import { getRefreshToken } from '../modules/storage/io';

export const AuthContext = createContext<
  { user: User; logout: Function; refresh: Function } | undefined
>(undefined);

export enum Status {
  PENDING,
  VISITOR,
  LOGGED,
}

const Auth: FC = ({ children }) => {
  const [status, setStatus] = useState<Status>(Status.PENDING);
  const [user, setUser] = useState<User | undefined>(undefined);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    axiosInstance.post('/auth/logout', { token: getRefreshToken() });
    localStorage.clear();
    setUser(undefined);
    setStatus(Status.VISITOR);
    navigate('/');
  }, []);

  const handleErrors = () => {
    localStorage.clear();
    setUser(undefined);
    setStatus(Status.VISITOR);
    navigate('/');
  };

  window.onunhandledrejection = () => handleErrors();

  const refresh = useCallback(() => {
    axiosInstance.get(`/user/me`).then(({ data }) => {
      setUser(data);
      setStatus(Status.LOGGED);
    });
  }, [pathname]);

  useEffect(() => {
    refresh();
  }, [pathname]);

  const contextValue = useMemo(
    () => ({ user, logout, refresh }),
    [user, logout, refresh]
  );

  if (status === Status.PENDING) return null;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useLogout = () => {
  const { logout } = useContext(AuthContext);
  return logout;
};

export const useUser = (): User | undefined => {
  const { user } = useContext(AuthContext);
  return user;
};

export const useRefresh = () => {
  const { refresh } = useContext(AuthContext);
  return refresh;
};

export default Auth;
