import React, { useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ComponentViewProps } from '../types/types';

const ComponentView: React.FC<ComponentViewProps> = (props): JSX.Element => {
  const { componentData, handleToggle, expanded, handleClick } = props;

  return (
    <>
      {componentData.length === 0 && (
        <div id='no-islands'>No Astro Islands found.</div>
      )}
      {componentData.length > 0 && (
        <TreeView
          aria-label='file system navigator'
          defaultCollapseIcon={<ExpandMoreIcon sx={{ color: 'whitesmoke' }} />}
          defaultExpandIcon={<ChevronRightIcon sx={{ color: 'whitesmoke' }} />}
          onNodeSelect={handleClick}
          onNodeToggle={handleToggle}
          expanded={expanded}
          sx={{
            height: '100vh',
            flexGrow: 1,
            width: 'auto',
            overflowY: 'auto',
          }}
        >
          {componentData}
        </TreeView>
      )}
    </>
  );
};

export default ComponentView;
