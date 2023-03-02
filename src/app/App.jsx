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
  const [islandData, setIslandData] = useState({});

  const handleClick = function (e, nodeId) {
    // function gets data after running it in panel.jsx
    // get the id of the treeItem clicked
    const id = nodeId;

    // check for id of astro
    if (islandData[id]) setCurrentComp(islandData[id]);
    else setCurrentComp(null);
  };

  //function to add astro island nodes to state when parsing dom
  const addIslandData = (astroIsland, key) => {
    // const arrayOfKeys = islandData.map(obj => Object.keys(obj)[0]);
    const arrayOfKeys = Object.keys(islandData);
    // console.log(arrayOfKeys)
    
    if (!arrayOfKeys.includes(key)) {
      setIslandData({ ...islandData, [key]: astroIsland });
    }
    
    // console.log(islandData);
  }

  // if id is not found, display 'this is static' on the side pane
  // set isClicked to True

  useEffect(() => {
    async function fetchData() {
      const data = await parseData();
      // console.log('data from useEffect App.jsx', data);
      setBodyData(data);
    }
    fetchData();
  }, []);

  //place all astro islands in an object with a unique id (ex A1, A2, A3)
  // iterate through each island object to find props and client directive
  //pass down to side pane only when that island is clicked
  // when another element is clicked reset side pane and display a new one with the clicked element

  return (
    <div>
      <p>In APP.JSX</p>
      {bodyData && <Panel handleClick={handleClick} html={bodyData} addIslandData={addIslandData} />}
      <SidePane currentComp={currentComp} />
    </div>
  );
};

export default App;
