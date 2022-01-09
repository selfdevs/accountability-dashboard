import React, { FC, useCallback, useEffect, useReducer } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from 'react-query';
import { DateTime } from 'luxon';
import { request } from '../../modules/http/client';
import Entry from '../../entities/Entry';
import { Actions, initialState, reducer } from './reducer';
import Button from '../Button/Button';

type EntryEditorProps = {
  entries: Entry[];
  editId?: string;
  setEditId: Function;
};

const EntryEditor: FC<EntryEditorProps> = ({ editId, entries, setEditId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const queryClient = useQueryClient();

  const reset = useCallback(() => {
    setEditId(null);
    dispatch({ type: Actions.RESET });
  }, [setEditId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const pathName = editId ? `/entry/${editId}` : '/entry';
    request(pathName, editId ? 'PATCH' : 'POST', {
      date: DateTime.now().toUTC().set({ day: state.day }).startOf('day'),
      goal: state.goal,
      done: state.done,
      comment: state.comment,
    })
      .then(async () => {
        await queryClient.invalidateQueries('entries');
        if (editId) reset();
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (editId) {
      dispatch({
        type: Actions.EDIT,
        payload: entries.find(({ _id }) => editId === _id),
      });
    }
  }, [editId, entries]);

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="number"
        placeholder="Day"
        onChange={(e) =>
          dispatch({
            type: Actions.EDIT_DAY,
            payload: e.target.value,
          })
        }
        step={1}
        min={1}
        value={state.day || ''}
        disabled={state.edit}
      />
      <input
        type="number"
        placeholder="Goal"
        value={state.goal || ''}
        onChange={(e) =>
          dispatch({
            type: Actions.EDIT_GOAL,
            payload: e.target.value,
          })
        }
        min={0}
      />
      <input
        type="number"
        placeholder="Done"
        value={state.done || ''}
        onChange={(e) =>
          dispatch({
            type: Actions.EDIT_DONE,
            payload: e.target.value,
          })
        }
        min={0}
      />
      <textarea
        value={state.comment || ''}
        onChange={(e) =>
          dispatch({
            type: Actions.EDIT_COMMENT,
            payload: e.target.value,
          })
        }
        placeholder="Comment"
      />
      <p style={{ textAlign: 'center' }}>
        <Button className="button-confirm" type="submit">
          <FontAwesomeIcon icon={faCheck} size="1x" />
          &nbsp;Save
        </Button>
        <Button className="button-cancel" type="button" onClick={reset}>
          <FontAwesomeIcon icon={faTimes} size="1x" />
          &nbsp;{editId ? 'Cancel' : 'Clear'}
        </Button>
      </p>
    </form>
  );
};

export default EntryEditor;
