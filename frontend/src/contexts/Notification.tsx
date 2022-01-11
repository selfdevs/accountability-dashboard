import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Toast from '../components/Toast/Toast';

const NotificationContext = createContext(null);

export const NotificationProvider: FC = ({ children }) => {
  const [message, setMessage] = useState(null);
  const timer = useRef(null);

  const close = useCallback(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    if (!message) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(close, 5000);

    // eslint-disable-next-line consistent-return
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [message]);

  return (
    <NotificationContext.Provider value={setMessage}>
      <Toast>{message}</Toast>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => useContext(NotificationContext);
