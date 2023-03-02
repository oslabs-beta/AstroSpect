import React, { useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

// create TS type for panel props


const Panel = (props) => {
  const { html, handleClick, addIslandData } = props;

  const propsParser = (attribute) => {
    const parsed = JSON.parse(attribute);
  
    const spreader = (obj) => {
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          let newVal = obj[key].slice(1);
          obj[key] = newVal[0];
          spreader(obj[key])
        }
      }
    }

    spreader(parsed);
    return parsed;
  }

  //Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
  const createTree = (node, id) => {
    //Inputs all child elements of current node into array
    const children = Array.from(node.children);

    //Stores ASTRO-ISLAND data in islandData state (from app)
    if (node.nodeName === "ASTRO-ISLAND") {
      const parsedProps = propsParser(node.attributes.props.value);
      const island = {
        client: node.attributes.client.value,
        props: parsedProps
      }

      addIslandData(island, id);
    }

    //If node has no children, return node
    if (children.length === 0) {
      return <TreeItem key={id} nodeId={id} label={node.nodeName} />;
    }

    //If node has children, recurse through function with each child node
    return (
      <TreeItem key={id} nodeId={id} label={node.nodeName}>
        {children.map((child, index) => createTree(child, `${id}-${index}`))}
      </TreeItem>
    );
  };

  const treeJSX = createTree(html.body, '0');
  
  // returns the completed tree
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleClick}
      sx={{
        height: '100vh',
        flexGrow: 1,
        width: 'auto',
        overflowY: 'auto',
        fontFamily: 'Roboto mono, monospace',
      }}
    >
      {treeJSX.props.children}
    </TreeView>
  );
};

/* for future use: filtering out nodes we don't want */
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
