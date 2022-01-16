import React, { FC, useEffect, useState } from 'react';
import './styles.css';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useScrollToCurrentDay } from './hooks';
// eslint-disable-next-line import/no-cycle
import EntryEditor from '../EntryEditor/EntryEditor';
import Entry from '../../entities/Entry';
import Button from '../Button/Button';

type TableProps = {
  className?: string;
  data: Entry[];
  readonly?: boolean;
};

const Table: FC<TableProps> = ({ data, className, readonly }) => {
  const [dataState, setDataState] = useState<Entry[]>(data);
  const { tbodyRef } = useScrollToCurrentDay(data.length > 0);

  useEffect(() => {
    if (data.length !== 0) {
      setDataState(data);
    }
  }, [data]);

  const removeAddRow = () =>
    setDataState((previousValue) => previousValue.slice(0, -1));

  return (
    <div className="left-column-table">
      <div
        className={`table-wrapper ${className || ''}`}
        style={{ position: 'relative', flex: '1' }}
      >
        <table className="data-table">
          <TableHeader readonly={readonly} />
          <tbody ref={tbodyRef}>
            {dataState.map((entry) => (
              <TableRow
                {...entry}
                key={entry.date}
                readonly={readonly}
                removeAddRow={removeAddRow}
              />
            ))}
          </tbody>
        </table>
      </div>
      {!readonly && (
        <>
          <Button
            type="button"
            className="button-add"
            onClick={() => {
              setDataState((previousValue) => [
                ...previousValue,
                { date: DateTime.now().toString() },
              ]);
            }}
          >
            <FontAwesomeIcon icon={faCheck} size="1x" />
            &nbsp;Add
          </Button>
          <EntryEditor />
        </>
      )}
    </div>
  );
};

export default Table;
