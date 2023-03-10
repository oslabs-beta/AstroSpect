import React from 'react';
import Panel from './containers/Panel';
import SidePane from './containers/SidePane';
import { useState, useEffect } from 'react';
import parseData from './algorithms/parseData.js';
import Header from './components/Header';

const App = () => {
  const [bodyData, setBodyData] = useState(null);
  const [currentComp, setCurrentComp] = useState(null);
  const [islandData, setIslandData] = useState({});
  const [elementData, setElementData] = useState({});
  const [idSet, setIdSet] = useState(new Set());
  const [idArray, setIdArray] = useState([]);
  
  const handleClick = function (e, nodeId) {
    // get the id of the treeItem clicked
    const id = nodeId;
    if (islandData[id]) setCurrentComp(islandData[id]);
    else if (elementData[id]) setCurrentComp(elementData[id]);
    else setCurrentComp(null);
  };

  //function to add astro island nodes to state when parsing dom
  const addIslandData = (astroIsland, key) => {
    if (!islandData[key]) {
      setIslandData({ ...islandData, [key]: astroIsland });
    }
  };

  const addElementData = (element, key) => {
    if (!elementData[key]) {
      setElementData({ ...elementData, [key]: element });
    }
  };

  const addId = (id) => {
    if (!idSet.has(id)) {
      setIdSet(new Set(idSet.add(id)));
      const idArray = Array.from(idSet);
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
  }, []);

  //place all astro islands in an object with a unique id (ex A1, A2, A3)
  // iterate through each island object to find props and client directive
  //pass down to side pane only when that island is clicked
  // when another element is clicked reset side pane and display a new one with the clicked element

  return (
    <>
      <Header />
      <div id='main-container'>
        {!bodyData && <div>Loading...</div>}
        {bodyData && (
          <Panel
            handleClick={handleClick}
            html={bodyData}
            addIslandData={addIslandData}
            addElementData={addElementData}
            addId={addId}
            idArray={idArray}
          />
        )}
        {bodyData && <SidePane currentComp={currentComp} />}
      </div>
    </>
  );
};

export default App;
