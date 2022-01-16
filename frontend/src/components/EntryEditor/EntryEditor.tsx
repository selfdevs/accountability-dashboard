import React, { FC, useCallback, useEffect, useReducer } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from 'react-query';
import { DateTime } from 'luxon';
import { request } from '../../modules/http/client';
import Entry from '../../entities/Entry';
import { Actions, initialState, reducer } from './reducer';
import Button from '../Button/Button';
import { useNotify } from '../../contexts/Notification';
import './styles.css';

type EntryEditorProps = {
  entries: Entry[];
  editId?: string;
  setEditId: Function;
};

const EntryEditor: FC<EntryEditorProps> = ({ editId, entries, setEditId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const notify = useNotify();
  const queryClient = useQueryClient();

  const reset = useCallback(() => {
    setEditId(null);
    dispatch({ type: Actions.RESET });
  }, [setEditId]);

  const generate = () => {
    request('/entry/month', 'POST')
      .then(async () => {
        await queryClient.invalidateQueries('entries');
        if (editId) reset();
      })
      .catch((e) => notify(e.message));
  };
/*
  const handleAdd = (event) => {
    event.preventDefault();
    const pathName = '/entry';
    request(pathName, 'POST', {
      date: DateTime.now().toUTC().set({ day: state.day }).startOf('day'),
    })
        .then(async () => {
          await queryClient.invalidateQueries('entries');
          if (editId) reset();
        })
        .catch((e) => notify(e.message));
  }
*/


  const handleAdd = (event) => {
    event.preventDefault();
  }





  useEffect(() => {
    if (editId) {
      dispatch({
        type: Actions.EDIT,
        payload: entries.find(({ _id }) => editId === _id),
      });
    }
  }, [editId, entries]);

  return (


    <form className="entry-editor">



      <div style={{ textAlign: 'center' }}>

        <Button type="button" className="button-add"  onClick={handleAdd}>
          <FontAwesomeIcon icon={faCheck} size="1x" />
          &nbsp;Add
        </Button>

        {entries.length < DateTime.now().endOf('month').day && (
          <Button type="button" onClick={generate}>
            Generate missing days for the month
          </Button>
        )}

      </div>
    </form>
  );
};

export default EntryEditor;
