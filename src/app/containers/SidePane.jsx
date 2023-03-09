import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

// side pane for displaying props and client
const SidePane = (props) => {
  // get the properties from current component
  const { currentComp } = props;
  //Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
  const createPropsDisplay = (obj, id) => {
    const topLevel = [];
    for (const propName in obj) {
      let elem;
      let newId = String(id++);
      const propLabel = `${propName}: ${obj[propName]}`;
      if (typeof obj[propName] === 'object') {
        elem = (
          <TreeItem key={newId} nodeId={newId} label={propName}>
            {createPropsDisplay(obj[propName], `${++newId}`)}
          </TreeItem>
        );
      } else {
        elem = <TreeItem key={newId} nodeId={newId} label={propLabel} />;
      }
      topLevel.push(elem);
    }
    // console.log('this is topLevel', topLevel);
    return topLevel;
  };

  let propsDisplay = [];

  if (currentComp) {
    propsDisplay = createPropsDisplay(currentComp.props, '99');
  }

  return (
    <div id="sidepane-container">
      {/* // when component is not astro island */}
      {!currentComp && (
        <>
          <p>No hydrated component selected</p>
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
            aria-label="file system navigator"
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
