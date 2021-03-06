import React, { FC } from 'react';
import { useQueryClient } from 'react-query';
import Button from '../Button/Button';
import './styles.css';
import axiosInstance from '../../modules/http/axiosClient';

const EntryEditor: FC = () => {
  const queryClient = useQueryClient();

  const generate = () => {
    axiosInstance.post('/entry/month').then(async () => {
      await queryClient.invalidateQueries('entries');
    });
  };

  return (
    <Button type="button" onClick={generate}>
      Generate missing days for the month
    </Button>
  );
};

export default EntryEditor;
