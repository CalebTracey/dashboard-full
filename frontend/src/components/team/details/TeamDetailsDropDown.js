import React from 'react';
import { Dropdown, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
const TeamDetailsDropDown = ({ handleCreateTask, showDeleteTeamConfirm }) => {
  const menu = (
    <Menu>
      <Menu.Item key="add-dd" onClick={handleCreateTask}>
        Add Task
      </Menu.Item>

      <Menu.Item key="delete-dd" onClick={showDeleteTeamConfirm}>
        Delete Team
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <MenuOutlined style={{ fontSize: 'x-large' }} />
    </Dropdown>
  );
};
export default TeamDetailsDropDown;
