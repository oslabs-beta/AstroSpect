import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const Panel = () => {
  // creates treewalker for window DOM
  const walker = window.document.createTreeWalker(
    document.documentElement,
    NodeFilter.SHOW_ELEMENT
  );
  console.log(walker);

  // while (walker.nextNode()) {
  //   let current = walker.currentNode;
  //   if (current.tagName === 'ASTRO-ISLAND') {
  //     console.log(
  //       current.tagName,
  //       [...current.attributes]
  //         .map(({ value, name }) => `${name}=${value}`)
  //         .join()
  //     );

  //     islands.push(
  //       [...current.attributes]
  //         .map(({ value, name }) => `${name}=${value}`)
  //         .join()
  //     );
  //   }
  // }

  // traverses window DOM and adds tree items for each HTML element

  return (
    <TreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId='1' label='Applications'>
        <TreeItem nodeId='2' label='Calendar' />
      </TreeItem>
      <TreeItem nodeId='5' label='Documents'>
        <TreeItem nodeId='10' label='OSS' />
        <TreeItem nodeId='6' label='MUI'>
          <TreeItem nodeId='8' label='index.js' />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

// displays tree
// must import MUI tree components

export default Panel;
