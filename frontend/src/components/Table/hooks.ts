import { useLayoutEffect, useReducer, useRef } from 'react';
import { DateTime } from 'luxon';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../contexts/Notification';
import { request } from '../../modules/http/client';

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

export const INPUT_CHANGE = 'inputChange';
export const SWITCH_EDIT_MODE = 'switchEditMode';

const tableReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SWITCH_EDIT_MODE:
      return {
        ...state,
        editMode: !state.editMode,
      };
    default:
      return state;
  }
};

export const useTableRow = (
  entryId,
  initialDateISOString,
  initialGoal,
  initialDone,
  initialComment,
  removeAddRow
) => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(tableReducer, {
    editMode: typeof entryId === 'undefined',
    day: DateTime.fromISO(initialDateISOString).day,
    goal: initialGoal,
    done: initialDone,
    comment: initialComment,
  });
  const notify = useNotify();

  const deleteEntry = () => {
    if (typeof entryId === 'undefined') {
      removeAddRow();
      return;
    }
    request(`/entry/${entryId}`, 'DELETE')
      .then(() => queryClient.invalidateQueries('entries'))
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  };

  const handleSubmit = async () => {
    const pathName = entryId ? `/entry/${entryId}` : '/entry';
    try {
      await request(pathName, entryId ? 'PATCH' : 'POST', {
        date: DateTime.now().toUTC().set({ day: state.day }).startOf('day'),
        goal: state.goal,
        done: state.done,
        comment: state.comment,
      });
      await queryClient.invalidateQueries('entries');
      return true;
    } catch (e) {
      notify(e.message);
    }
    return false;
  };

  return { state, dispatch, deleteEntry, handleSubmit };
};
