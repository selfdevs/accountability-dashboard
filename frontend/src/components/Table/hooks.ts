import { useLayoutEffect, useReducer, useRef } from 'react';
import { DateTime } from 'luxon';
import { useQueryClient } from 'react-query';
import axiosInstance from '../../modules/http/axiosClient';
import { useNotify } from '../../contexts/Notification';
import { useRefresh } from '../../contexts/Auth';

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
  const notify = useNotify();
  const refresh = useRefresh();

  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(tableReducer, {
    editMode: typeof entryId === 'undefined',
    day: DateTime.fromISO(initialDateISOString).day,
    goal: initialGoal,
    done: initialDone,
    comment: initialComment,
  });

  const deleteEntry = () => {
    if (typeof entryId === 'undefined') {
      removeAddRow();
      return;
    }
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `You sure you wanna delete Entry for day ${state.day}? Think again.`
      )
    ) {
      axiosInstance
        .delete(`/entry/${entryId}`)
        .then(() => queryClient.invalidateQueries('entries'));
    }
  };

  const handleSubmit = async () => {
    const pathName = entryId ? `/entry/${entryId}` : '/entry';
    const response = axiosInstance({
      url: pathName,
      method: entryId ? 'PATCH' : 'POST',
      data: {
        date: DateTime.now().toUTC().set({ day: state.day }).startOf('day'),
        goal: state.goal,
        done: state.done,
        comment: state.comment,
      },
    })
      .then(async () => {
        await queryClient.invalidateQueries('entries');
        return true;
      })
      .catch(() => {
        notify('Entry for that day already exists!');
        refresh();
        return false;
      });

    return response;
  };

  return { state, dispatch, deleteEntry, handleSubmit };
};
