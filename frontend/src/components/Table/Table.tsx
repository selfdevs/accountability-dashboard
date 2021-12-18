import React, { useMemo } from 'react';
import './styles.css';
import { sampleDataGenerator } from '../../mocks/table-data';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useScrollToCurrentDay } from './hooks';

const Table = () => {
  const data = useMemo(sampleDataGenerator, []);
  const { tbodyRef } = useScrollToCurrentDay();

  return (
    <table className="data-table">
      <TableHeader />
      <tbody ref={tbodyRef}>
        {data.map((entry) => <TableRow {...entry} key={entry.date.toLocaleString()} />)}
      </tbody>
    </table>
  );
};

export default Table;
