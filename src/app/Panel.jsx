import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

// create TS type for panel props

const Panel = (props) => {
  const { body, handleClick } = props;
  const treeArray = [
    <TreeItem nodeId="99" label={'test-parent'}>
      <TreeItem nodeId="98" label={'test-child'} />
    </TreeItem>,
  ];

  // creates treewalker for window DOM (not correct document)
  // console.log('this is the body in panel', html);
  const walker = html.createTreeWalker(html.body, NodeFilter.SHOW_ELEMENT);

  // array of parent level tree components
  //body
  //header
  //anchor
  //div
  //div

  // fills treeArray with HTML elements from document
  const treeMaker = (node = walker.nextNode(), counter = 10) => {
    // if (!node) return;
    // const elem = <TreeItem nodeId={counter} label={node.tagName} />;
    // treeArray.push(elem);
    // treeMaker(walker.nextSibling(), ++counter);

    // once branch (or whole tree) is complete, return
    if (!node) return;
    const elem = <TreeItem nodeId={counter.toString()} label={node.tagName} />;

    // // if elem has child, make new array, within array
    // if (node.hasChildNodes()) {
    const childNodes = [];
    // let child = node.firstChild(); //child

    // put all of node's children into the childNodes array
    while ((node = walker.nextSibling())) {
      console.log(childNodes);

      // childNodes.push(treeMaker(child, counter));
      childNodes.push(<TreeItem nodeId={++counter} label={node.tagName} />);
    }

    const parent = (
      <TreeItem nodeId={counter} label={node.tagName}>
        {childNodes}
      </TreeItem>
    );

    treeArray.push(parent);

    // recursively call treeMaker passing in the child
    // treeMaker(node.firstChild(), ++counter)
    // } else {
    //   // } else {
    //   //   const elem = <TreeItem nodeId={counter} label={node.tagName} />;
    //   // }
    //   const elem = <TreeItem nodeId={counter} label={node.tagName}></TreeItem>;
    //   // else if elem does not contain child, move
    //   return elem;
    // }
    // treeArray.push(elem);
    // //
    // treeMaker(walker.nextSibling(), ++counter);
  };

  treeMaker();
  // returns the completed tree
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleClick}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="A">
        <TreeItem nodeId="2" label="A1"></TreeItem>
      </TreeItem>
      <TreeItem nodeId="5" label="B">
        <TreeItem nodeId="10" label="B1" />
        <TreeItem nodeId="6" label="B2">
          <TreeItem nodeId="A1" label="B2A" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};
// const filterDom = () => {
//   const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
//   let node = walker.firstChild();
//   while (node) {
//     //filter out the all script elements
//     if (node.tagName === 'script') {
//       node.remove();
//       continue;
//     }
//     //filter out style attributes
//     if (node.hasAttribute('style')) {
//       node.removeAttribute('style');
//       continue;
//     }

//     //if the node has a child node, recurse?
//     console.log('node:', node);
//     node = walker.nextSibling();
//   }
// };

// displays tree
// must import MUI tree components

export default Panel;
