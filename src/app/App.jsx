import React from 'react';
import Panel from './Panel';
import SidePane from './SidePane';
import { useState, useEffect } from 'react';
import parseData from './parser.js';

const App = () => {
  const initial = {
    A1: {
      props: 'color',
      client: 'load',
    },
  };

  const [bodyData, setBodyData] = useState(null);
  const [islands, setIslands] = useState(initial);
  const [currentComp, setCurrentComp] = useState(null);

  function handleClick(e) {
    // function gets data after running it in panel.jsx
    // get the id of the treeItem clicked
    const id = e.target.nodeId;
    console.log(`Clicked ${id}`);
    // check for id of astro
    if (islands[id]) setCurrentComp(islands[id]);
    else setCurrentComp(null);
  }

  // if id is not found, display 'this is static' on the side pane
  // set isClicked to True

  useEffect(async () => {
    const data = await parseData();
    setBodyData(data);
  }, []);

  //place all astro islands in an object with a unique id (ex A1, A2, A3)
  // iterate through each island object to find props and client directive
  //pass down to side pane only when that island is clicked
  // when another element is clicked reset side pane and display a new one with the clicked element

  return (
    <div>
      <p>In APP.JSX</p>
      {bodyData && <Panel onClick={handleClick} body={bodyData} />}
      <SidePane currentComp={currentComp} />
    </div>
  );
};

export default App;
