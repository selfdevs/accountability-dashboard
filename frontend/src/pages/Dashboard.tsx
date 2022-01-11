import React, { FC, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Table from '../components/Table/Table';
import ScratchPad from '../components/ScratchPad/ScrathPad';
import Social from '../components/Social/Social';
import Chart from '../components/Chart/Chart';
import { useLogout, useUser } from '../contexts/Auth';
import EditableTitle from '../components/EditableTitle/EditableTitle';
import { fetchEntries } from '../entities/Entry';
import { fetchUser } from '../entities/User';

type DashboardProps = {
  readonly?: boolean;
};

const Dashboard: FC<DashboardProps> = ({ readonly }) => {
  const { username } = useParams();
  const loggedInUser = useUser();
  const logout = useLogout();

  const usernameToQuery = useMemo(
    () => username || loggedInUser?.username,
    [username, loggedInUser]
  );

  useEffect(() => {
    if (!usernameToQuery) logout();
  }, [usernameToQuery, logout]);

  const { data: user } = useQuery(
    ['user', username],
    fetchUser(usernameToQuery),
    { enabled: Boolean(usernameToQuery) }
  );

  const { data } = useQuery('entries', fetchEntries(usernameToQuery), {
    enabled: Boolean(usernameToQuery),
  });

  return (
    <>
      <EditableTitle title={user?.dashboardTitle} readonly={readonly} />
      <Social user={user} readonly={readonly} />
      <div className="layout">
        <Table data={data || []} readonly={readonly} />
        <div className="flex1">
          <Chart entries={data || []} />
          {!readonly && <ScratchPad defaultText="Hello world" />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
