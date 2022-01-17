import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import _ from 'lodash';
import { SAVING_DELAY } from './constants';
import { getStateText } from './utils';
import { request } from '../../modules/http/client';

type ScratchPadHook = {
  loadingText: string;
  onChangeHandler: ChangeEventHandler;
  value: string;
};

export const useScratchPad = (text: string): ScratchPadHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const timer = useRef(null);

  const onChangeHandler = useCallback((e) => {
    setValue(e.target.value);
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      request('/user', 'PATCH', { scratchpad: e.target.value }).catch(_.noop);
      setLoading(false);
    }, SAVING_DELAY);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const loadingText = useMemo(() => getStateText(loading), [loading]);

  return {
    loadingText,
    onChangeHandler,
    value,
  };
};
