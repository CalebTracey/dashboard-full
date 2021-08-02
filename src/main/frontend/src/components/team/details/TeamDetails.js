import React, { lazy, useState } from 'react';
import { PageHeader, Spin, Badge } from 'antd';
import { Redirect } from 'react-router-dom';
import './TeamDetails.css';
import TeamDetailsDropDown from './TeamDetailsDropDown';
import { Suspense } from 'react';

const TeamDetailListContainer = lazy(() => import('./containers/TeamDetailListContainer'));
const TeamTaskListContainer = lazy(() => import('./containers/TeamTaskListContainer'));

const TeamDetails = ({ showDeleteTeamConfirm, team }) => {
  return !team ? (
    <Redirect to={'/'} />
  ) : (
    <>
      <PageHeader
        fontWeight="bold"
        className="site-page-header"
        onBack={() => window.history.back()}
        title={team.teamName}
        extra={[<TeamDetailsDropDown showDeleteTeamConfirm={showDeleteTeamConfirm} />]}
      />
      <div
        style={{
          fontWeight: 'bold',
          alignContent: 'center',
          marginLeft: '11%',
          marginBottom: '1rem',
        }}
      >
        {'Current Tasks '} <Badge className="team-badge" count={team.teamTasks.length} />
      </div>

      <Suspense fallback={<Spin />}>
        <div className="team-detail-wrapper container">
          <TeamTaskListContainer team={team} />
        </div>
        <div
          style={{
            fontWeight: 'bold',
            alignContent: 'center',
            marginLeft: '11%',
            marginTop: '-.75rem',
            marginBottom: '1rem',
          }}
        >
          {'Team Members '} <Badge className="team-badge" count={team.employees.length} />
        </div>
        <TeamDetailListContainer key={team.id} team={team} />
      </Suspense>
    </>
  );
};

export default TeamDetails;