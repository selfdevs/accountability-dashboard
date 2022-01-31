import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFromStorage } from '../modules/storage/io';
import { User } from '../entities/User';

export const AuthContext = createContext<
  { user: User; refresh: Function; logout: Function } | undefined
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
    localStorage.clear();
    setUser(undefined);
    setStatus(Status.VISITOR);
    navigate('/');
  }, []);

  const refresh = useCallback(() => {
    const token = getFromStorage('accessToken');
    if (!token) {
      setStatus(Status.VISITOR);
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw Error('Visitor');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setStatus(Status.LOGGED);
      })
      .catch(() => {
        setStatus(Status.VISITOR);
      });
  }, [pathname]);

  useEffect(() => {
    refresh();
  }, [pathname]);

  const contextValue = useMemo(
    () => ({ user, refresh, logout }),
    [user, refresh, logout]
  );

  if (status === Status.PENDING) return null;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useRefresh = () => {
  const { refresh } = useContext(AuthContext);
  return refresh;
};

export const useLogout = () => {
  const { logout } = useContext(AuthContext);
  return logout;
};

export const useUser = (): User | undefined => {
  const { user } = useContext(AuthContext);
  return user;
};

export default Auth;
