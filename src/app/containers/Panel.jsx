import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ElementView from '../components/ElementView';
import ComponentView from '../components/ComponentView.jsx';
import TreeItem from '@mui/lab/TreeItem';
import parseProps from '../algorithms/parseProps.ts';

const Panel = (props) => {
  const { html, handleClick, addIslandData, idArray, addId } = props;
  const [expanded, setExpanded] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const componentData = [];

  // alternates between expanding and collapsing all nodes
  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? idArray : []));
  };

  // updates expanded nodes on toggle of individual nodes
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  // Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
  const createTree = (node, id, fontColor = '#F5F5F5') => {
    // adds id to idArray, required for expandAll functionality
    addId(id);
    // Stores ASTRO-ISLAND data in islandData state (from app)
    if (node.nodeName === 'ASTRO-ISLAND') {
      // parse props attribute of astro-island element
      const parsedProps = parseProps(node.attributes.props.value);
      // creates island object, with client and props info
      const island = {
        client: node.attributes.client.value,
        props: parsedProps,
      };
      // saves island object to an object of all island objects
      addIslandData(island, id);
      // parses component-url attrbute to give astro-island descriptive name
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
        // if astro-island have no children, returns leaf TreeItem (orange)
        const islandTreeItem = (
          <TreeItem
            key={id}
            nodeId={id}
            label={`${node.nodeName.toLowerCase()} (${componentFile})`}
            sx={{ color: '#ff7300' }}
          />
        );
        // adds island to array used for Component View
        componentData.push(islandTreeItem);
        return islandTreeItem;
      } else {
        // when astro island has children, returns parent TreeItem (orange)
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

        // adds island to array used for Component View
        componentData.push(islandTreeItem);

        return islandTreeItem;
      }
    }

    // If node has no children, return node
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
      // If node has children, recurse through function with each child node
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

  const treeJSX = createTree(html.body, '0');

  // returns the completed tree
  return (
    <div id='panel-container'>
      <div id='panel-header'>
        <div id='panel-toggle'>
          <button
            className={`buttonToggle button0 ${
              selectedTab === 0 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(0)}
          >
            All Elements
          </button>
          <button
            className={`buttonToggle button1 ${
              selectedTab === 1 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(1)}
          >
            Islands Only
          </button>
        </div>
        <SearchBar handleExpandClick={handleExpandClick} expanded={expanded} />
      </div>
      <div className='container element' style={{ display: 'flex'}}>
        {selectedTab === 0 && (
          <ElementView
            html={html}
            handleClick={handleClick}
            expanded={expanded}
            handleToggle={handleToggle}
            createTree={createTree}
            elementData={treeJSX.props.children}
          />
        )}
        {selectedTab === 1 && (
          <ComponentView
            componentData={componentData}
            handleToggle={handleToggle}
            handleClick={handleClick}
            expanded={expanded}
          />
        )}
      </div>
    </div>
  );
};

export default Panel;
