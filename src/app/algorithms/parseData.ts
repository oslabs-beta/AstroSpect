import React from 'react';

declare const chrome: any;

// parses html of target page in order to construct tree
const parseData = async (): Promise<Document> => {
  // gets html of target page using Chrome API methods
  const html: string = await new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(
      'document.documentElement.outerHTML',
      (result: string, exception: string) => {
        if (exception) {
          reject(exception);
        } else {
          resolve(result);
        }
      }
    );
  });

  // parses HTML string into document object
  const parser = new DOMParser();
  const stringToDoc: Document = parser.parseFromString(html, 'text/html');

  // returns document object
  return stringToDoc;
};

export default parseData;
