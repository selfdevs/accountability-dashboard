import {
  ChangeEventHandler,
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { getFromStorage, saveToStorage } from '../../modules/storage/io';
import { SAVING_DELAY, SCRATCHPAD_STORAGE_KEY } from './constants';
import { getStateText } from './utils';

type ScratchPadHook = {
  loadingText: string
  onChangeHandler: ChangeEventHandler
  value: string
};

export const useScratchPad = (defaultText: string): ScratchPadHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const timer = useRef(null);

  const onChangeHandler = useCallback((e) => {
    setValue(e.target.value);
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      saveToStorage(SCRATCHPAD_STORAGE_KEY, e.target.value);
      setLoading(false);
    }, SAVING_DELAY);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const restoredData = getFromStorage(SCRATCHPAD_STORAGE_KEY);
    if (restoredData) {
      setValue(restoredData);
    } else {
      setValue(defaultText);
    }
  }, []);

  const loadingText = useMemo(() => getStateText(loading), [loading]);

  return {
    loadingText,
    onChangeHandler,
    value,
  };
};
