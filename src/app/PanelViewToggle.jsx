import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const PanelViewToggle = (props) => {
  const { selectedTab, setSelectedTab } = props;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div id="panel-toggle">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="views tabs"
      >
        <Tab label="Elements" />
        <Tab label="Components" />
      </Tabs>
    </div>
  );
};

export default PanelViewToggle;
