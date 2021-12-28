import React from 'react';
import Table from '../components/Table/Table';
import ScratchPad from '../components/ScratchPad/ScrathPad';
import Social from '../components/Social/Social';

const Dashboard = () => (
  <>
    <h1>Play 10 minutes piano per day</h1>
    <Social />
    <div className="layout">
      <Table />
      <div className="flex1">
        <ScratchPad />
      </div>
    </div>
  </>
);

export default Dashboard;
