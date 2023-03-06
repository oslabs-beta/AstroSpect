import React from 'react';
import Panel from './Panel';
import SidePane from './SidePane';
import { useState, useEffect } from 'react';
import parseData from './parseData.js';
import Header from './Header';

const App = () => {
  const [bodyData, setBodyData] = useState(null);
  const [currentComp, setCurrentComp] = useState(null);
  const [islandData, setIslandData] = useState({});
  const [idSet, setIdSet] = useState(new Set());
  const [idArray, setIdArray] = useState([]);

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
    if (!islandData[key]) {
      setIslandData({ ...islandData, [key]: astroIsland });
    }
  };

  const addId = (id) => {
    if (!idSet.has(id)) {
      setIdSet(new Set(idSet.add(id)));
      const idArray = Array.from(idSet);
      console.log('this is idArray in addId', idArray);
      setIdArray([...idArray]);
    }
  };

  // if id is not found, display 'this is static' on the side pane
  // set isClicked to True

  useEffect(() => {
    async function fetchData() {
      const data = await parseData();
      setBodyData(data);
    }
    fetchData();
  }, [bodyData]);

  //place all astro islands in an object with a unique id (ex A1, A2, A3)
  // iterate through each island object to find props and client directive
  //pass down to side pane only when that island is clicked
  // when another element is clicked reset side pane and display a new one with the clicked element

  return (
    <>
      <Header />
      <div id="main-container">
        {bodyData && (
          <Panel
            handleClick={handleClick}
            html={bodyData}
            addIslandData={addIslandData}
            addId={addId}
            idArray={idArray}
          />
        )}
        <SidePane currentComp={currentComp} />
      </div>
    </>
  );
};

export default App;
