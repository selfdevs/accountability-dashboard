import React, { FC, useState } from 'react';
import './styles.css';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useScrollToCurrentDay } from './hooks';
// eslint-disable-next-line import/no-cycle
import EntryEditor from '../EntryEditor/EntryEditor';
import Entry from '../../entities/Entry';

type TableProps = {
  className?: string;
  data: Entry[];
  readonly?: boolean;
};

const Table: FC<TableProps> = ({ data, className, readonly }) => {
  const [editId, setEditId] = useState<string>(undefined);
  const { tbodyRef } = useScrollToCurrentDay(data.length > 0);

  return (
    <div className="left-column-table">
      <div
        className={`table-wrapper ${className || ''}`}
        style={{ position: 'relative', flex: '1' }}
      >
        <table className="data-table">
          <TableHeader readonly={readonly} />
          <tbody ref={tbodyRef}>
            {data.map((entry) => (
              <TableRow {...entry} key={entry.date} readonly={readonly} />
            ))}
            <TableRow  key="addingLine" readonly={readonly}  _id="addingLine" comment="" date="" editMode/>
          </tbody>
        </table>
      </div>
      {!readonly && (
        <EntryEditor entries={data} editId={editId} setEditId={setEditId} />
      )}
    </div>
  );
};

export default Table;
