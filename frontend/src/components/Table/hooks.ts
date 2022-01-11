import { useLayoutEffect, useRef } from 'react';
import { DateTime } from 'luxon';

export const useScrollToCurrentDay = (enable: boolean) => {
  const tbodyRef = useRef(null);

  useLayoutEffect(() => {
    const currentDay = DateTime.now().get('day');
    if (tbodyRef.current && tbodyRef.current.childNodes[currentDay]) {
      tbodyRef.current.childNodes[currentDay - 1].scrollIntoView({
        block: 'center',
      });
    }
  }, [enable]);

  return {
    tbodyRef,
  };
};
