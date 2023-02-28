// Listen for panel creation event
chrome.devtools.panels.create(
  'Astro Panel',
  '/download.png',
  'panel.html',
  (
    panel //Executes this callback once panel is created.
  ) =>
    panel.onShown.addListener((window) => {
      // Retrieve's the target page's HTML
      async function getTargetPageHTML() {
        // console.log('Attempting to retrieve dom tree from target html');
        // Use chrome.devtools.inspectedWindow.eval() to retrieve the page's HTML
        const html = await new Promise((resolve, reject) => {
          chrome.devtools.inspectedWindow.eval(
            'document.documentElement.outerHTML',
            //error handling
            (result, exception) => {
              if (exception) {
                reject(exception);
              } else {
                resolve(result);
              }
            }
          );
        });

        return html;
      }

      // Call the getTargetPageHTML() function and render the HTML in the dev tools panel
      (async () => {
        try {
          //retrieve html contents as string
          const html = await getTargetPageHTML();
          //parse through to convert string to document model
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(html, 'text/html');
          // Use DOMParser again to create DOM nodes from the XML string
          // const domParser2 = new DOMParser();
          // const doc2 = domParser2.parseFromString(xml, 'application/xml');

          const filteredData = [];
          const filterDom = () => {
            const walker = doc.createTreeWalker(
              doc.body,
              NodeFilter.SHOW_ELEMENT
            );
            let node = walker.firstChild();
            while (node) {
              //filter out the all script elements
              if (node.tagName === 'script') {
                node.remove();
                continue;
              }
              //filter out style attributes
              if (node.hasAttribute('style')) {
                node.removeAttribute('style');
                continue;
              }

              //if the node has a child node, recurse?
              // console.log('node:', node);
              node = walker.nextSibling();
            }
          };

          const domTreeContainer = window.document.getElementById('dom-tree');
          // console.log('doc', doc);
          // console.log('typeofDoc', typeof doc);
          // console.log('html:', html);
          // console.log('typeof:', typeof html);

          // const codeElement = window.document.createElement('code');
          // domTreeContainer.textContent = xml;
          // codeElement.style.whiteSpace = 'pre-wrap';
          // domTreeContainer.appendChild(xml);
        } catch (error) {
          console.error(error);
        }
      })();
    })
);
