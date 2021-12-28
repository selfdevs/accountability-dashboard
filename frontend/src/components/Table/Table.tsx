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
    <div style={{ position: 'relative', flex: '1 0 400px' }}>
      <div className="table-header-bg" />
      <table className="data-table">
        <TableHeader />
        <tbody ref={tbodyRef}>
          {data.map((entry) => <TableRow {...entry} key={entry.date.toLocaleString()} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
