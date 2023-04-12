import React from 'react';
// @ts-ignore
import Panel from './containers/Panel';
// @ts-ignore
import SidePane from './containers/SidePane';
import { useState, useEffect } from 'react';
import parseData from './algorithms/parseData';
import Header from './components/Header';
import {
  CurrentComp,
  IslandData,
  AddIslandData,
  HandleClick,
  AddId,
} from './types/types';

const App: React.FC = (): JSX.Element => {
  const [bodyData, setBodyData] = useState<Document | null>(null);
  const [currentComp, setCurrentComp] = useState<CurrentComp | null>(null);
  const [islandData, setIslandData] = useState<IslandData>({});
  const [idSet, setIdSet] = useState<Set<string>>(new Set<string>());
  const [idArray, setIdArray] = useState<string[]>([]);

  const handleClick: HandleClick = (event, id) => {
    // get the id of the treeItem clicked
    if (islandData[id]) {
      setCurrentComp(islandData[id]);
    } else setCurrentComp(null);
  };

  // function to add astro island nodes to state when parsing dom
  const addIslandData: AddIslandData = (astroIsland, id) => {
    // if (!islandData[id]) {
    setIslandData((prevIslandData) => ({
      ...prevIslandData,
      [id]: astroIsland,
    }));
    // }
  };

  const addId: AddId = (id) => {
    if (!idSet.has(id)) {
      setIdSet(new Set(idSet.add(id)));
      const idArray: string[] = Array.from(idSet);
      setIdArray([...idArray]);
    }
  };

  // if id is not found, display 'this is static' on the side pane
  // set isClicked to True

  useEffect((): void => {
    (async function fetchData(): Promise<void> {
      const data: Document = await parseData();
      setBodyData(data);
    })();
  }, []);

  //place all astro islands in an object with a unique id (ex A1, A2, A3)
  // iterate through each island object to find props and client directive
  //pass down to side pane only when that island is clicked
  // when another element is clicked reset side pane and display a new one with the clicked element

  return (
    <>
      <Header />
      <div id="main-container">
        {!bodyData && <div>Loading...</div>}
        {bodyData && (
          <Panel
            handleClick={handleClick}
            html={bodyData}
            addIslandData={addIslandData}
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
