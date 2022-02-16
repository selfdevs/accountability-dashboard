import React, { FC } from 'react';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

import { INPUT_CHANGE, SWITCH_EDIT_MODE, useTableRow } from './hooks';

type TableRowProps = {
  _id?: string;
  date: string;
  goal?: number;
  done?: number;
  comment?: string;
  readonly?: boolean;
  removeAddRow: Function;
};

const TableRow: FC<TableRowProps> = ({
  _id,
  date: initialDateISOString,
  goal: initialGoal,
  done: initialDone,
  comment: initialComment,
  readonly,
  removeAddRow,
}) => {
  const { handleSubmit, deleteEntry, state, dispatch } = useTableRow(
    _id,
    initialDateISOString,
    initialGoal,
    initialDone,
    initialComment,
    removeAddRow
  );
  const { day, goal, comment, done, editMode } = state;

  return (
    <tr className="shadowed">
      {editMode ? (
        <>
          <td>
            <input
              type="number"
              placeholder="Day"
              value={day}
              onChange={(e) =>
                dispatch({
                  type: INPUT_CHANGE,
                  name: 'day',
                  value: e.target.value,
                })
              }
              step={1}
              min={1}
              max={31}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Goal"
              value={goal || ''}
              onChange={(e) => {
                dispatch({
                  type: INPUT_CHANGE,
                  name: 'goal',
                  value: e.target.value,
                });
              }}
              min={0}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Done"
              value={done || ''}
              onChange={(e) => {
                dispatch({
                  type: INPUT_CHANGE,
                  name: 'done',
                  value: e.target.value,
                });
              }}
              min={0}
            />
          </td>
          <td>
            <textarea
              placeholder="Comment"
              value={comment || ''}
              onChange={(e) => {
                dispatch({
                  type: INPUT_CHANGE,
                  name: 'comment',
                  value: e.target.value,
                });
              }}
            />
          </td>
        </>
      ) : (
        <>
          <td>{DateTime.fromISO(initialDateISOString).toFormat('d')}</td>
          <td>{goal}</td>
          <td>{done}</td>
          <td>{comment}</td>
        </>
      )}

      {!readonly && (
        <td>
          <FontAwesomeIcon
            icon={editMode ? faCheck : faPen}
            onClick={async () => {
              if (editMode) {
                if (await handleSubmit()) {
                  dispatch({ type: SWITCH_EDIT_MODE });
                }
              } else {
                dispatch({ type: SWITCH_EDIT_MODE });
              }
            }}
            className={`action  ${editMode ? 'action-submit' : 'action-edit'}`}
          />

          <FontAwesomeIcon
            icon={faTrash}
            onClick={deleteEntry}
            className="action action-delete"
          />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
