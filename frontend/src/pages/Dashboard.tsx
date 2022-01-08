import React from 'react';
import { useQuery } from 'react-query';
import Table from '../components/Table/Table';
import ScratchPad from '../components/ScratchPad/ScrathPad';
import Social from '../components/Social/Social';
import Chart from '../components/Chart/Chart';
import { useUser } from '../contexts/Auth';
import { fetchEntries } from '../entities/Entry';

const Dashboard = () => {
  const user = useUser();
  const { data } = useQuery('entries', fetchEntries);

  return (
    <>
      <h1>{user?.dashboardTitle}</h1>
      <Social />
      <div className="layout">
        <Table data={data || []} />
        <div className="flex1">
          <Chart entries={[]} />
          <ScratchPad defaultText="Hello world" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
