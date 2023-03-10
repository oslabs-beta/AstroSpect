// parses html of target page in order to construct tree
const parseData = async() => {
  // gets html of target page using Chrome API methods
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
  // parses HTML string into document object
  const parser = new DOMParser();
  const stringToDoc = parser.parseFromString(html, 'text/html');
  // returns document object
  return stringToDoc;
}

export default parseData;
