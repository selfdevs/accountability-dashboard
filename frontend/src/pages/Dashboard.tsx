import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const personalDataUsername = username || 'me';
  const { data: user } = useQuery(
    ['user', personalDataUsername],
    fetchUser(personalDataUsername)
  );

  const entriesUsername = username || loggedInUser?.username;
  const { data } = useQuery(
    ['entries', entriesUsername],
    fetchEntries(entriesUsername),
    {
      enabled: Boolean(entriesUsername),
    }
  );

  return (
    <>
      <NavLink to="/">
        <FontAwesomeIcon icon={faHome} />
      </NavLink>
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
