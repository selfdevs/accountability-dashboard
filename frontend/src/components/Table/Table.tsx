import React from 'react';
import './styles.css';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useScrollToCurrentDay } from './hooks';

const Table = ({ data }) => {
  const { tbodyRef } = useScrollToCurrentDay();
  const entries = data.data;

  return (
    <div style={{ position: 'relative', flex: '1' }}>
      <div className="table-header-bg" />
      <table className="data-table">
        <TableHeader />
        <tbody ref={tbodyRef}>
          {entries.map((entry) => <TableRow {...entry} key={entry.date.toLocaleString()} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
