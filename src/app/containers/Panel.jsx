import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import ElementView from '../components/ElementView';
import ComponentView from '../components/ComponentView.jsx';
import TreeItem from '@mui/lab/TreeItem';
import parseProps from '../algorithms/parseProps.ts';

// create TS type for panel props
  
const Panel = (props) => {
  const { html, handleClick, addIslandData, idArray, addId } = props;
  const [expanded, setExpanded] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  // const [componentData, setComponentData] = useState([]);
  const componentData = [];

  // alternates between expanding and collapsing all nodes
  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? idArray : []));
  };

  // updates expanded nodes on toggle of particular nodes
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  // checks if component is inside componentData
  // const addComponentData = (item) => {
  //   // if item is not in componentData
  //   if (!componentData.includes(item)){
  //     setComponentData([...componentData, item])
  //   }
  // }

  // Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
  const createTree = (node, id, fontColor = '#F5F5F5') => {
    // adds id to idArray, required for expandAll functionality
    addId(id);
    // Stores ASTRO-ISLAND data in islandData state (from app)
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

      if (!node.children) {
        const islandTreeItem = (
          <TreeItem
            key={id}
            nodeId={id}
            label={`${node.nodeName.toLowerCase()} (${componentFile})`}
            sx={{ color: '#ff7300' }}
          />
        );
        componentData.push(islandTreeItem)
        return islandTreeItem;
      } else {
        //Inputs all child elements of current node into array
        const children = Array.from(node.children);

        const islandTreeItem = (
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
        
        componentData.push(islandTreeItem)

        //recurse through function with each child node
        return islandTreeItem;
      }
    }

    //If node has no children, return node
    if (!node.children) {
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()}`}
          sx={{ color: fontColor }}
        />
      );
    } else {
      const children = Array.from(node.children);
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
    }
  };
  
  // returns the completed tree
  return (
    <div id="panel-container">
      <div id="panel-header">
        <div id="panel-toggle">
          <button
            className={`buttonToggle button0 ${
              selectedTab === 0 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(0)}
          >
            Elements
          </button>
          <button
            className={`buttonToggle button1 ${
              selectedTab === 1 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(1)}
          >
            Components
          </button>
        </div>
        <SearchBar handleExpandClick={handleExpandClick} expanded={expanded} />
      </div>
      <div
        className="container element"
        style={{ display: selectedTab === 0 ? 'flex' : 'none' }}
      >
        <ElementView
          html={html}
          handleClick={handleClick}
          expanded={expanded}
          handleToggle={handleToggle}
          createTree={createTree}
        />
      </div>
      <div
        className="container component"
        style={{ display: selectedTab === 1 ? 'flex' : 'none' }}
      >
        <ComponentView
          componentData={componentData}
          handleToggle={handleToggle}
          handleClick={handleClick}
          expanded={expanded}
        />
      </div>
    </div>
  );
};

export default Panel;
