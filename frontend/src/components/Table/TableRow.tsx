import React, { FC } from 'react';
import Entry from '../../entities/Entry';

const TableRow: FC<Entry> = ({
  date, goal, done, comment,
}) => (
  <tr className="shadowed">
    <td>{date.toFormat('d ')}</td>
    <td>{goal}</td>
    <td>{done}</td>
    <td>{comment}</td>
  </tr>
);

export default TableRow;
