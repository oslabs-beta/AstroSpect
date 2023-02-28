import React from 'react';
import Panel from './Panel';
import SidePane from './SidePane';
import { useState, useEffect } from 'react';
import parseData from './parser.js';

const App = () => {
  const [bodyData, setBodyData] = useState(null);
  const [islands, setIslands] = useState(null);

  // handleClick function (e)
  // const id = e.target.id
  // get the id of the treeItem clicked
  // check for id of astro
  // if id is not found, display 'this is static' on the side pane

  useEffect(() => {
    async function fetchData() {
      const data = await parseData();
      console.log('data from useEffect App.jsx', data);
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
      {bodyData && <Panel html={bodyData} />}
      <SidePane />
    </div>
  );
};
export default App;
