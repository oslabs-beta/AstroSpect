import React, { useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// create TS type for panel props

const ElementView = (props) => {
  const { html, handleClick, expanded, handleToggle, createTree } = props;

  const treeJSX = createTree(html.body, '0');

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
        {treeJSX.props.children}
      </TreeView>
    </>
  );
};

export default ElementView;
