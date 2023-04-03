import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Typography } from '@mui/material';
// import { CurrentComp } from '../types';

// interface SidePaneProps {
//   currentComp: CurrentComp;
// }

// side pane for displaying props and client
const SidePane = (props) => {
  // get the properties from current component
  const { currentComp } = props;
  //Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
  const createPropsDisplay = (obj, id) => {
    // creates array of parent props
    const topLevel = [];
    // loops through props in currentComp obj
    for (const propName in obj) {
      let elem;
      let newId = String(id++);
      // const propLabel = `${propName}: ${obj[propName]}`;
      const propValue = obj[propName];
      // checks if there is a nested prop, create a child tree item
      if (typeof obj[propName] === 'object') {
        // if so, tree item is created, with recursive processing of children
        elem = (
          <TreeItem
            key={newId}
            nodeId={newId}
            label={
              <Typography component='div'>
                <span style={{ color: '#d494ff' }}>{propName}: </span>
              </Typography>
            }
          >
            {createPropsDisplay(obj[propName], `${++newId}`)}
          </TreeItem>
        );
      } else {
        // otherwise lead tree item is created
        elem = (
          <TreeItem
            key={newId}
            nodeId={newId}
            label={
              <Typography component='div'>
                <span style={{ color: '#d494ff' }}>{propName}: </span>
                {String(propValue)}
              </Typography>
            }
          />
        );
      }
      // the result is then pushed to the array of parent tree items
      topLevel.push(elem);
    }
    // returns array of parent tree items, with nested children (if any)
    return topLevel;
  };

  let propsDisplay = [];

  // if astro-island is selected in Panel, a new propsDisplay is created
  if (currentComp) {
    // propsDisplay updates to result of calling CPD on that astro-island's props
    propsDisplay = createPropsDisplay(currentComp.props, '99');
  }

  return (
    <div id='sidepane-container'>
      {/* // when component is not astro island */}
      {!currentComp && (
        <>
          <h3>Type: </h3>
          <p>Static HTML</p>
          <hr />
        </>
      )}

      {/* // when clicked is Astro Island */}
      {currentComp && (
        <>
          <h3>Type: </h3>
          <p>Astro Island</p>
          <hr />
          <h3>Client Directive:</h3>
          <p> {currentComp.client}</p>
          <hr />
          <h3>Props: </h3>
          <TreeView
            aria-label='file system navigator'
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              height: '100vh',
              flexGrow: 1,
              width: 'auto',
              overflowY: 'auto',
              fontFamily: 'Roboto mono, monospace',
            }}
          >
            {propsDisplay}
          </TreeView>
          <hr />
        </>
      )}
    </div>
  );
};

export default SidePane;
