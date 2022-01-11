import {useLayoutEffect, useReducer, useRef} from 'react';
import { DateTime } from 'luxon';
import {useQueryClient} from "react-query";
import {useNotify} from "../../contexts/Notification";
import {request} from "../../modules/http/client";

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

const tableReducer = (state, action) => {
  switch (action.type) {
    case "inputChange":
      return {
        ...state,
        [action.name]:action.value
      };
    case "switchEditMode":
      return {
        ...state,
        editMode: !state.editMode
      }
    default:
      return state;
  }
};

export const useTableRow = (_id, initialGoal, initialDone, initialComment) => {
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(tableReducer, {editMode : false, goal : initialGoal, done : initialDone, comment : initialComment});
  const notify = useNotify();

  const deleteEntry = () => {
    request(`/entry/${_id}`, 'DELETE')
        .then(() => queryClient.invalidateQueries('entries'))
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
  };

  const handleEdit = () => {
    const pathName =`/entry/${_id}`;
    request(pathName, 'PATCH' , {
      goal: state.goal,
      done: state.done,
      comment: state.comment,
    })
        .then(async () => {
          await queryClient.invalidateQueries('entries');
        })
        .catch((e) => notify(e.message));
  };

  return {state, dispatch, deleteEntry, handleEdit};
}
