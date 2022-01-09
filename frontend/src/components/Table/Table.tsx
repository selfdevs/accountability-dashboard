import React, { FC, useState } from 'react';
import './styles.css';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useScrollToCurrentDay } from './hooks';
import EntryEditor from '../EntryEditor/EntryEditor';
import Entry from '../../entities/Entry';

type TableProps = {
  className?: string;
  data: Entry[];
};

const Table: FC<TableProps> = ({ data, className }) => {
  const [editId, setEditId] = useState<string>(undefined);
  const { tbodyRef } = useScrollToCurrentDay(data.length > 0);

  return (
    <div
      className={`table-wrapper ${className || ''}`}
      style={{ position: 'relative', flex: '1' }}
    >
      <table className="data-table">
        <TableHeader />
        <tbody ref={tbodyRef}>
          {data.map((entry) => (
            <TableRow {...entry} key={entry.date} setEditId={setEditId} />
          ))}
        </tbody>
      </table>
      <EntryEditor entries={data} editId={editId} setEditId={setEditId} />
    </div>
  );
};

export default Table;
