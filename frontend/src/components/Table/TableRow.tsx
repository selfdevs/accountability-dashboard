import React, { FC } from 'react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { useQueryClient } from 'react-query';
import { request } from '../../modules/http/client';

type TableRowProps = {
  _id: string;
  date: string;
  goal: number;
  done: number;
  comment: string;
  setEditId: Function;
  readonly?: boolean;
};

const TableRow: FC<TableRowProps> = ({
  _id,
  date,
  goal,
  done,
  comment,
  setEditId,
  readonly,
}) => {
  const queryClient = useQueryClient();
  const deleteEntry = () => {
    request(`/entry/${_id}`, 'DELETE')
      .then(() => queryClient.invalidateQueries('entries'))
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  };

  const editEntry = () => {
    setEditId(_id);
  };

  return (
    <tr className="shadowed">
      <td>{DateTime.fromISO(date).toFormat('d')}</td>
      <td>{goal}</td>
      <td>{done}</td>
      <td>{comment}</td>
      {!readonly && (
        <td>
          <FontAwesomeIcon
            icon={faPen}
            onClick={editEntry}
            className="action action-edit"
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
