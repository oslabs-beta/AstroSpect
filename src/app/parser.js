async function parseData() {
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
  return stringToDoc;
}

export default parseData;
