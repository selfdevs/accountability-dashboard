import { useLayoutEffect, useRef } from 'react';
import { DateTime } from 'luxon';

export const useScrollToCurrentDay = () => {
  const tbodyRef = useRef(null);

  useLayoutEffect(() => {
    const currentDay = DateTime.now().get('day');
    if (tbodyRef.current && tbodyRef.current.childNodes[currentDay]) {
      tbodyRef.current.childNodes[currentDay].scrollIntoView({ block: 'center' });
    }
  }, []);

  return {
    tbodyRef,
  };
};
