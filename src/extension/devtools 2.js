// create a function using treeWalker that grabs the information we want from the DOM representation; it will output two arrays — one with all the nodes that we want to represent on the left side of our panel, and the other with all the nodes that are Astro islands; run our props/hydration/framework extracting function on the array with the Astro islands nodes to display info on the right side of the panel

// takes in a stringified DOM tree as input and parses through it, returning objects about each island which contain info on the framework, hydration, and props of the island
const parseTree = dom => {
  // grab all the raw string between the opening and closing <astro-island> tabs
  const matches = dom.matchAll(/<astro-island([\s\S]*?)<\/astro-island>/g);
  const islandsRaw = [...matches].map(match => match[1]);

  // container for all of the islands found in the DOM
  const islands = [];

  // iterate through each raw island string and extract pieces of information about it
  for (let island of islandsRaw) {
    // grab the framework type from the current node
    const frameworkMatch = island.match(/@astrojs_([^_]*)_/);
    const frameworkType = frameworkMatch ? frameworkMatch[1] : null;

    // grab the client directive from the current node
    const hydrationMatch = island.match(/client="([^"]*)"/);
    const hydrationType = hydrationMatch ? hydrationMatch[1].split(',')[0] : null;

    // grab all the props from the current node
    const propsMatch = island.match(/props="(.+?)"/);
    // const componentProps = propsMatch ? JSON.parse(propsMatch[1].replace(/&quot;/g, '"')) : null;
    const componentProps = propsMatch ? propsMatch[1].replace(/&quot;/g, '"') : null;

    // create an object for each astro island to hold info about which framework it's associated with, its props, and its client directive
    islands.push({
      framework: frameworkType,
      hydration: hydrationType,
      props: componentProps,
    });
  }

  return islands;
}

// Listen for panel creation event
chrome.devtools.panels.create(
  'Astro Panel',
  '/download.png',
  'panel.html',
  (
    panel //Executes this callback once panel is created.
  ) =>
    panel.onShown.addListener((window) => {
      // Retrieves the target page's HTML
      async function getTargetPageHTML() {
        console.log('Attempting to retrieve dom tree from target html');
        // Use chrome.devtools.inspectedWindow.eval() to retrieve the page's HTML
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

        return html;
      }

      // Call the getTargetPageHTML() function and render the HTML in the dev tools panel
      (async () => {
        try {
          // store the target page's HTML
          const html = await getTargetPageHTML();

          // make a reference to the #dom-tree element of panel.html
          const domTreeContainer = window.document.getElementById('dom-tree');
          
          /* displays a formatted DOM tree in the panel */
          // console.log('html:', html);
          // const codeElement = window.document.createElement('code');
          // codeElement.textContent = html;
          // codeElement.style.whiteSpace = 'pre-wrap';
          // domTreeContainer.appendChild(codeElement);
          /* */

          // run the parseTree function on the target page's stringified HTML and store the outputted array in the variable 'islands'
          const islands = parseTree(html);

          const islandsList = window.document.createElement('ul');

          for (let i of islands) {
            const island = window.document.createElement('li');
            // const props = window.document.createElement('ul');
            // for (let prop of i.props) console.log(prop);
            // console.log(i.props);

            island.innerHTML = `found an element that belongs to the ${i.framework} framework. it has a directive to hydrate on ${i.hydration}. here are its props: ${i.props}`
            islandsList.appendChild(island);
          }

          domTreeContainer.appendChild(islandsList);
        } catch (error) {
          console.error(error);
        }
      })();
    })
);
