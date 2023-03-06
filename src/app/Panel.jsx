import React, { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import SearchBar from './SearchBar';
import parseProps from './parseProps';

// create TS type for panel props

const Panel = (props) => {
  const { html, handleClick, addIslandData, idArray, addId } = props;
  const [expanded, setExpanded] = useState([]);

  //Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
  const createTree = (node, id, fontColor = '#F5F5F5') => {
    //Inputs all child elements of current node into array
    const children = Array.from(node.children);
    // adds id to idArray, required for expandAll functionality
    addId(id);
    //Stores ASTRO-ISLAND data in islandData state (from app)
    if (node.nodeName === 'ASTRO-ISLAND') {
      const parsedProps = parseProps(node.attributes.props.value);
      const island = {
        client: node.attributes.client.value,
        props: parsedProps,
      };
      addIslandData(island, id);
      let componentFile = node.attributes['component-url'].value;
      let lastIndex = null;
      for (let i = componentFile.length - 1; i > 0; i--) {
        if (componentFile[i] === '.') lastIndex = i;
        if (componentFile[i] === '/') {
          if (lastIndex) componentFile = componentFile.slice(i + 1, lastIndex);
          else componentFile = componentFile.slice(i + 1);
          break;
        }
      }

      if (children.length === 0) {
        return (
          <TreeItem
            key={id}
            nodeId={id}
            label={`${node.nodeName.toLowerCase()} (${componentFile})`}
            sx={{ color: '#ff7300' }}
          />
        );
      }
      //If node has children, recurse through function with each child node
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()} (${componentFile})`}
          sx={{ color: '#ff7300' }}
        >
          {children.map((child, index) =>
            createTree(child, `${id}-${index}`, '#e29353')
          )}
        </TreeItem>
      );
    }
    //If node has no children, return node
    if (children.length === 0) {
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()}`}
          sx={{ color: fontColor }}
        />
      );
    }

    //If node has children, recurse through function with each child node
    return (
      <TreeItem
        key={id}
        nodeId={id}
        label={`${node.nodeName.toLowerCase()}`}
        sx={{ color: fontColor }}
      >
        {children.map((child, index) =>
          createTree(child, `${id}-${index}`, fontColor)
        )}
      </TreeItem>
    );
  };

  const treeJSX = createTree(html.body, '0');

  // alternates between expanding and collapsing all nodes
  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? idArray : []));
  };

  // updates expanded nodes on toggle of particular nodes
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  // returns the completed tree
  return (
    <div id='main-panel'>
      <SearchBar handleExpandClick={handleExpandClick} expanded={expanded} />
      <TreeView
        aria-label='file system navigator'
        defaultCollapseIcon={<ExpandMoreIcon sx={{ color: '#d5bcef' }} />}
        defaultExpandIcon={<ChevronRightIcon sx={{ color: '#d5bcef' }} />}
        onNodeSelect={handleClick}
        onNodeToggle={handleToggle}
        sx={{
          height: '100vh',
          flexGrow: 1,
          width: 'auto',
          overflowY: 'auto',
          fontFamily: 'Roboto mono, monospace',
        }}
        expanded={expanded}
      >
        {treeJSX.props.children}
      </TreeView>
    </div>
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
