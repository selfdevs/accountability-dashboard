import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import { request } from '../../modules/http/client';
import Button from '../Button/Button';
import { useNotify } from '../../contexts/Notification';
import './styles.css';

const EntryEditor: FC = () => {
  const notify = useNotify();
  const queryClient = useQueryClient();

  const generate = () => {
    request('/entry/month', 'POST')
      .then(async () => {
        await queryClient.invalidateQueries('entries');
      })
      .catch((e) => notify(e.message));
  };

  return (
    <Button type="button" onClick={generate}>
      Generate missing days for the month
    </Button>
  );
};

export default EntryEditor;
