import React, { FC } from 'react';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

import { INPUT_CHANGE, SWITCH_EDIT_MODE, useTableRow } from './hooks';

type TableRowProps = {
  _id: string;
  date: string;
  goal: number;
  done: number;
  comment: string;
  readonly?: boolean;
};

const TableRow: FC<TableRowProps> = ({
  _id,
  date,
  goal: initialGoal,
  done: initialDone,
  comment: initialComment,
  readonly,
}) => {
  const { handleEdit, deleteEntry, state, dispatch } = useTableRow(
    _id,
    initialGoal,
    initialDone,
    initialComment
  );
  const { goal, comment, done, editMode } = state;

  return (
    <tr className="shadowed">
      <td>{DateTime.fromISO(date).toFormat('d')}</td>

      {editMode ? (
        <>
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
            <input
              type="text"
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
          <td>{goal}</td>
          <td>{done}</td>
          <td>{comment}</td>
        </>
      )}

      {!readonly && (
        <td>
          <FontAwesomeIcon
            icon={editMode ? faCheck : faPen}
            onClick={() => {
              if (editMode) {
                handleEdit();
              }
              dispatch({ type: SWITCH_EDIT_MODE });
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
