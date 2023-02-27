import React from 'react';
import Panel from './Panel';
import SidePane from './SidePane';
import { useState, useEffect } from 'react';
import parseData from './parser.js';

const App = () => {
  const [bodyData, setBodyData] = useState(null);

  useEffect(async () => {
    const data = await parseData();
    setBodyData(data);
  }, []);

  return (
    <div>
      <p>In APP.JSX</p>
      {bodyData && <Panel body={bodyData} />}
      <SidePane />
    </div>
  );
};
export default App;
