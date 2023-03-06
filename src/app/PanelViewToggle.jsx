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
    <Box sx={{ width: '50%' }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="views tabs"
      >
        <Tab label="Elements" />
        <Tab label="Components" />
      </Tabs>
    </Box>
  );
};

export default PanelViewToggle;
