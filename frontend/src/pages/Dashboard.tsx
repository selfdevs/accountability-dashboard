import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Table from '../components/Table/Table';
import ScratchPad from '../components/ScratchPad/ScrathPad';
import Social from '../components/Social/Social';
import Chart from '../components/Chart/Chart';
import EditableTitle from '../components/EditableTitle/EditableTitle';
import { fetchEntries } from '../entities/Entry';
import { fetchUser } from '../entities/User';
import { useUser } from '../contexts/Auth';

type DashboardProps = {
  readonly?: boolean;
};

const Dashboard: FC<DashboardProps> = ({ readonly }) => {
  const { username } = useParams();
  const loggedInUser = useUser();

  const { data: user } = useQuery(
    ['user', username],
    fetchUser(username || 'me')
  );

  const { data } = useQuery(
    'entries',
    fetchEntries(username || loggedInUser?.username),
    {
      enabled: Boolean(username || loggedInUser?.username),
    }
  );

  return (
    <>
      <EditableTitle title={user?.dashboardTitle} readonly={readonly} />
      <Social user={user} readonly={readonly} />
      <div className="layout">
        <Table data={data || []} readonly={readonly} />
        <div className="flex1">
          <Chart entries={data || []} />
          {!readonly && <ScratchPad text={user?.scratchpad} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
