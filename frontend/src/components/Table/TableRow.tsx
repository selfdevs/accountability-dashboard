import React, { FC } from 'react';
import { Entry } from '../../mocks/table-data';

const TableRow: FC<Entry> = ({
  date, goal, done, comment,
}) => (
  <tr>
    <td>{date.toLocaleString()}</td>
    <td>{goal}</td>
    <td>{done}</td>
    <td>{comment}</td>
  </tr>
);

export default TableRow;
