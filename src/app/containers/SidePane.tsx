import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Typography } from '@mui/material';
import { SidePaneProps } from '../types/types';

// Displays Side Pane of type, props, and client-directive of element clicked (in Panel)
const SidePane: React.FC<SidePaneProps> = (props): JSX.Element => {
  // currentComp contains info on currently clicked element (ASTRO-ISLAND or null)
  const { currentComp } = props;
  // creates a dropdown tree of currently clicked ASTRO-ISLAND's props 
  const createPropsDisplay = (obj: Record<string, any>, id: number) => {
    // initializes array of parent props
    const topLevel: JSX.Element[] = [];
    // loops through props in currentComp obj
    for (const propName in obj) {
      // sets elem to be pushed to topLevel 
      let elem: JSX.Element;
      // sets id to be assigned to elem
      let newId: number = id++;
      const propValue = obj[propName];
      // if there are children props, creates a tree item with children
      if (typeof obj[propName] === 'object') {
        // sets elem to tree item with recursive call to create child item
        elem = (
          <TreeItem
            key={newId}
            nodeId={newId.toString()}
            label={
              <Typography component='div'>
                <span style={{ color: '#d494ff' }}>{propName}: </span>
              </Typography>
            }
          >
            {createPropsDisplay(obj[propName], newId + 1)}
          </TreeItem>
        );
      } else {
        // sets elem as leaf tree item
        elem = (
          <TreeItem
            key={newId}
            nodeId={newId.toString()}
            label={
              <Typography component='div'>
                <span style={{ color: '#d494ff' }}>{propName}: </span>
                {String(propValue)}
              </Typography>
            }
          />
        );
      }
      // resulting elem is then pushed to the array of parent tree items
      topLevel.push(elem);
    }
    // returns array of parent tree items, with nested children (if any)
    return topLevel;
  };

  // array that stores tree items of calling createPropsDisplay
  let propsDisplay: JSX.Element[] = [];

  // if an ASTRO-ISLAND is currently clicked, propsDisplay is updated
  if (currentComp) {
    // propsDisplay updates to result of calling CPD on that ASTRO-ISLAND's props
    propsDisplay = createPropsDisplay(currentComp.props, 99);
  }

  return (
    <div id='sidepane-container'>
      {/* // when element clicked is not an ASTRO-ISLAND */}
      {!currentComp && (
        <>
          <h3>Type: </h3>
          <p>Static HTML</p>
          <hr />
        </>
      )}

      {/* // when element clicked is an ASTRO-ISLAND */}
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
