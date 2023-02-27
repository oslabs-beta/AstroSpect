import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

// create TS type for panel props

const Panel = (props) => {
  const { body } = props;
  const treeArray = [
    <TreeItem nodeId={99} label={'test-parent'}>
      <TreeItem nodeId={98} label={'test-child'} />
    </TreeItem>,
  ];
  // creates treewalker for window DOM (not correct document)
  if (body !== null) {
    console.log(body);
    const walker = body.createTreeWalker(body, NodeFilter.SHOW_ELEMENT);

    // array of parent level tree components

    // fills treeArray with HTML elements from document
    const treeMaker = (node = walker.nextNode(), counter = 10) => {
      // once branch (or whole tree) is complete, return
      if (!node) return;
      const elem = <TreeItem nodeId={counter} label={node.tagName} />;

      // // if elem has child, make new array, within array
      // if (node.hasChildNodes()) {
      //   // return
      //   const parent = (
      //     <TreeItem nodeId={counter} label={node.tagName}></TreeItem>
      //   );
      // } else {
      //   const elem = <TreeItem nodeId={counter} label={node.tagName} />;
      // }

      // else if elem does not contain child, move

      treeArray.push(elem);
      //
      treeMaker(walker.nextNode(), ++counter);
    };

    treeMaker(walker.nextNode());
  }
  // returns the completed tree
  return (
    <TreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId='1' label='A'>
        <TreeItem nodeId='2' label='A1' />
      </TreeItem>
      <TreeItem nodeId='5' label='B'>
        <TreeItem nodeId='10' label='B1' />
        <TreeItem nodeId='6' label='B2'>
          <TreeItem nodeId='8' label='B2A' />
        </TreeItem>
      </TreeItem>
      {treeArray}
    </TreeView>
  );
};

// displays tree
// must import MUI tree components

export default Panel;
