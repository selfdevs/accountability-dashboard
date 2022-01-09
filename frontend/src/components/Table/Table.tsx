import React, { useState } from 'react';
import './styles.css';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useScrollToCurrentDay } from './hooks';
import EntryEditor from '../EntryEditor/EntryEditor';

const Table = ({ data }) => {
  const [editId, setEditId] = useState<string>(undefined);
  const { tbodyRef } = useScrollToCurrentDay(data.length > 0);

  return (
    <div className="table-wrapper" style={{ position: 'relative', flex: '1' }}>
      <table className="data-table">
        <TableHeader />
        <tbody ref={tbodyRef}>
          {data.map((entry) => (
            <TableRow {...entry} key={entry.date} setEditId={setEditId} />
          ))}
        </tbody>
      </table>
      <div className="entry-editor">
        <EntryEditor entries={data} editId={editId} setEditId={setEditId} />
      </div>
    </div>
  );
};

export default Table;
