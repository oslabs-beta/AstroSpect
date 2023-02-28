// takes in a stringified DOM tree as input and parses through it, returning objects about each island which contain info on the framework, hydration, and props of the island
const parseTree = (dom) => {
  // grab all the raw string between the opening and closing <astro-island> tabs
  const matches = dom.matchAll(/<astro-island([\s\S]*?)<\/astro-island>/g);
  const islandsRaw = [...matches].map((match) => match[1]);

  // container for all of the islands found in the DOM
  const islands = [];

  // iterate through each raw island string and extract pieces of information about it
  for (let island of islandsRaw) {
    // grab the framework type from the current node
    const frameworkMatch = island.match(/@astrojs_([^_]*)_/);
    const frameworkType = frameworkMatch ? frameworkMatch[1] : null;

    // grab the client directive from the current node
    const hydrationMatch = island.match(/client="([^"]*)"/);
    const hydrationType = hydrationMatch
      ? hydrationMatch[1].split(',')[0]
      : null;

    // grab all the props from the current node
    const propsMatch = island.match(/props="(.+?)"/);
    // const componentProps = propsMatch ? JSON.parse(propsMatch[1].replace(/&quot;/g, '"')) : null;
    const componentProps = propsMatch
      ? propsMatch[1].replace(/&quot;/g, '"')
      : null;

    // create an object for each astro island to hold info about which framework it's associated with, its props, and its client directive
    islands.push({
      framework: frameworkType,
      hydration: hydrationType,
      props: componentProps,
    });
  }

  return islands;
};

/* with JSDOM */
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;

// const parseTree = dom => {
//   // create a DOM environment and load a test document
//   const document = dom.window.document;

//   // populate the islands array
//   const walker = document.createTreeWalker(document.documentElement);
//   const islands = [];

//   while (walker.nextNode()) {
//     let current = walker.currentNode;
//     if (current.tagName === 'ASTRO-ISLAND') {
//       // store the current node contents in a string
//       const astroIsland = [...current.attributes].map(({value,name}) => `${name}=${value}`).join();

//       // grab the framework type from the current node
//       const frameworkMatch = astroIsland.match(/@astrojs_([^_]*)_/);
//       const frameworkType = frameworkMatch ? frameworkMatch[1] : null;

//       // grab the client directive from the current node
//       const hydrationMatch = astroIsland.match(/client=([^_]*)/);
//       const hydrationType = hydrationMatch ? hydrationMatch[1].split(',')[0] : null;

//       // grab all the props from the current node
//       const propsMatch = astroIsland.match(/props=({.*?}),/);
//       const componentProps = propsMatch ? JSON.parse(propsMatch[1]) : null;

//       // create an object for each astro island to hold info about which framework it's associated with, its props, and its client directive
//       islands.push({
//         framework: frameworkType,
//         hydration: hydrationType,
//         props: componentProps,
//       });
//     }
//   }

//   console.log(islands);
// }
