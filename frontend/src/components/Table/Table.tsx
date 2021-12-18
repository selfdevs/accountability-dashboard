import React, { useMemo } from 'react';
import './styles.css';
import { sampleDataGenerator } from '../../mocks/table-data';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = () => {
  const data = useMemo(sampleDataGenerator, []);

  return (
    <table className="data-table">
      <TableHeader />
      <tbody>
        {data.map((entry) => <TableRow {...entry} key={entry.date.toLocaleString()} />)}
      </tbody>
    </table>
  );
};

export default Table;
