import React from 'react';
import { useDispatch } from 'react-redux';
import { List } from 'antd';
import axios from 'axios';
import TeamDetailListItem from '../TeamDetailListItem';
import allActions from '../../../../redux/actions';
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

const TeamDetailItemContainer = ({ team, setShowModal, handleRemoveTeamMember }) => {
  const dispatch = useDispatch();

  const fetchFullEmployeeInfo = async (url) => {
    await axios
      .get(url)
      .then((res) => {
        dispatch(allActions.employees.employeeSelected(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const teamList = team.employees.map((e) => (
    <TeamDetailListItem
      team={team}
      key={e.id}
      employee={e}
      setShowModal={setShowModal}
      fetchFullEmployeeInfo={fetchFullEmployeeInfo}
      handleRemoveTeamMember={handleRemoveTeamMember}
    />
  ));

  return <List>{teamList}</List>;
};

export default TeamDetailItemContainer;
