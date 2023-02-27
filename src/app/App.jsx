import React from 'react';
import Panel from './Panel';
import SidePane from './SidePane';
import { useState, useEffect } from 'react';
// import parser function file, to run inside react



const App = () => {
  const [bodyData, setBodyData] = useState(null);

  async function getBodyData() {
    const html = await new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval(
        'document.documentElement.outerHTML',
        (result, exception) => {
          if (exception) {
            reject(exception);
          } else {
            resolve(result);
          }
        }
      );
    });
    const parser = new DOMParser();
    const stringToDoc = parser.parseFromString(html, 'text/html');
    setBodyData(stringToDoc);
    // console.log(html);
    // console.log(stringToDoc);
  }

  if (bodyData === null) {
    getBodyData();
  }

  // useEffect(() => {
  //   if (!bodyData) {
  //     getBodyData();
  //     console.log('this is bodyData:', bodyData);
  //   }
  // });

  // insert windowDoc in App below
  return (
    <div>
      <p>In APP.JSX</p>
      <Panel body={bodyData} />
      <SidePane />
    </div>
  );
};
export default App;
