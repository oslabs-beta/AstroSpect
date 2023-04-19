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
  //body data raw document nodes from target html
  const [bodyData, setBodyData] = useState<Document | null>(null);
  //prop info displayed in sidepane for the node that is clicked
  const [currentComp, setCurrentComp] = useState<CurrentComp | null>(null);
  //An object with prop data that is referenced when setting current comp
  const [islandData, setIslandData] = useState<IslandData>({});
  const [idSet, setIdSet] = useState<Set<string>>(new Set<string>());
  const [idArray, setIdArray] = useState<string[]>([]);

  // set the currentComp when a node is selected so we can display the Astro Island information if the node is an Island
  const handleClick: HandleClick = (event, id) => {
    if (islandData[id]) {
      setCurrentComp(islandData[id]);
    } else setCurrentComp(null);
  };

  // function to add astro island nodes to state when parsing dom
  const addIslandData: AddIslandData = (astroIsland, id) => {
    setIslandData((prevIslandData) => ({
      ...prevIslandData,
      [id]: astroIsland,
    }));
  };

  // adds id of each node in tree to an array of all ids
  const addId: AddId = (id) => {
    if (!idSet.has(id)) {
      setIdSet(new Set(idSet.add(id)));
      const idArray: string[] = Array.from(idSet);
      setIdArray([...idArray]);
    }
  };

  // parse the data from the DOM of the target page so we can pass in the DOM representation when creating the MUI tree
  useEffect((): void => {
    (async function fetchData(): Promise<void> {
      const data: Document = await parseData();
      setBodyData(data);
    })();
  }, []);

  // if bodyData is not fetched, renders Loading screen
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
