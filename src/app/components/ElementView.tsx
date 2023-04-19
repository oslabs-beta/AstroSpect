import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ElementViewProps } from '../types/types';

const ElementView: React.FC<ElementViewProps> = (props): JSX.Element => {
  const { handleClick, expanded, handleToggle, elementData } = props;

  // returns the completed tree
  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon sx={{ color: '#d5bcef' }} />}
        defaultExpandIcon={<ChevronRightIcon sx={{ color: '#d5bcef' }} />}
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
        {elementData}
      </TreeView>
    </>
  );
};

export default ElementView;
