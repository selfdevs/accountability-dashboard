import React, { useMemo } from 'react';
import Table from '../components/Table/Table';
import ScratchPad from '../components/ScratchPad/ScrathPad';
import Social from '../components/Social/Social';
import Chart from '../components/Chart/Chart';
import { sampleDataGenerator } from '../mocks/table-data';

const Dashboard = () => {
  const data = useMemo(sampleDataGenerator, []);

  return (
    <>
      <h1>Play 10 minutes piano per day</h1>
      <Social />
      <div className="layout">
        <Table data={data} />
        <div className="flex1">
          <Chart />
          <ScratchPad />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
