import React, { FC } from 'react';

type TableRowProps = {
  date: string
  goal: number
  done: number
  notes: string
};

const TableRow: FC<TableRowProps> = ({
  date, goal, done, notes,
}) => (
  <tr className="shadowed">
    <td>{date}</td>
    <td>{goal}</td>
    <td>{done}</td>
    <td>{notes}</td>
  </tr>
);

export default TableRow;
