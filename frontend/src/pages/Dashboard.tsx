import React, { useEffect, useState } from 'react';
import Table from '../components/Table/Table';
import ScratchPad from '../components/ScratchPad/ScrathPad';
import Social from '../components/Social/Social';
import Chart from '../components/Chart/Chart';

const Dashboard = () => {
  const [fetchedData, setFetchedData] = useState<any>();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/selfdevs/accountability-dashboard/develop/backend/mockdata.json')
      .then((response) => response.json()).then(setFetchedData);
  }, []);

  if (!fetchedData) return null;

  return (
    <>
      <h1>{fetchedData.chart.title}</h1>
      <Social
        name={fetchedData?.user?.name}
        github={fetchedData?.user?.github}
        linkedIn={fetchedData?.user?.linkedin}
      />
      <div className="layout">
        <Table data={fetchedData} />
        <div className="flex1">
          <Chart entries={fetchedData.data} />
          <ScratchPad defaultText={fetchedData?.scratch_board?.formatted_text} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
