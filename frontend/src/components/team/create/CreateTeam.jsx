import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Select, message } from 'antd';
import allActions from '../../../redux/actions/index';
import apiGet from '../../../apis/apiGet';
import CreateTeamForm from './CreateTeamForm';
import apiPost from '../../../apis/apiPost';
// import useGetTeams from '../../../hooks/useGetTeams';

const { Option } = Select;

const CreateTeam = () => {
  const employees = useSelector((state) => state.employees.employeeData);
  // const teams = useSelector((state) => state.teams.teamData);
  const [title, setTitle] = useState('');
  const [children, setChildren] = useState([]);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // const [teamRes, getTeams] = useGetTeams({
  //   url: 'teams',
  //   data: null,
  // });

  useEffect(() => {
    if (employees.length === 0) {
      apiGet({
        url: 'employees',
        headers: null,
        data: null,
      }).then((res) => {
        const sort = res.data._embedded.employees.sort((a, b) =>
          a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
        );
        dispatch(allActions.employees.employeeData(sort));
      });
    }
  }, [employees, dispatch]);

  useEffect(() => {
    if (children === undefined || children.length === 0) {
      employees.forEach((e) => {
        setChildren((children) => [
          ...children,
          <Option key={e.id}>{`${e.firstName} ${e.lastName}`}</Option>,
        ]);
      });
    }
  }, [employees, children]);

  const handleSelection = (event) => {
    if (event) {
      setTimeout(() => {
        setSelected(event);
      }, 500);
    }
  };

  const postNewTeam = async ({ newTeam }) => {
    await apiPost({
      url: 'teams',
      data: JSON.stringify(newTeam),
    })
      .then(() => {
        message.success(`${newTeam.teamName} added`);
        // console.log(res.data);
        dispatch(allActions.teams.teamAdded(newTeam));
        // history.push(`/team/${newTeam.id}`);
        history.push('/');
      })
      .catch((error) => {
        message.error(`Problem adding ${newTeam.teamName}`);
        console.log(error);
      });
  };

  // const teamUpdate = async () => {
  //   await getTeams();
  // };

  // const navToNewTeam = ({ newTeam }) => {
  //   teamUpdate().then(() => {
  //     // const newTeamId = teams.find(({ teamName }) => teamName === newTeam.teamName);
  //     // history.push(`/team/${newTeamId.id}`);
  //     history.push('/');
  //   });
  // };

  const handleCreateSubmit = () => {
    const newMembers = selected.map((s) => employees.find(({ id }) => id === parseInt(s, 10)));
    const newTeam = {
      teamName: title,
      employees: newMembers,
      teamTasks: [],
    };
    postNewTeam({ newTeam, title });
    // .then(() => navToNewTeam({ newTeam }));
  };

  return (
    <CreateTeamForm
      handleCreateSubmit={handleCreateSubmit}
      handleSelection={handleSelection}
      setTitle={setTitle}
      children={children}
    />
  );
};

export default CreateTeam;