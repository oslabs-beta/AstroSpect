// tests parseProps algorithm
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('tree walker tests', () => {
  it('should have three elements in islands array', () => {
    // create a DOM environment and load a test document
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <astro-island uid="1mSS4I" component-url="/src/components/TechStackItem" component-export="default" renderer-url="/node_modules/.vite/deps/@astrojs_react_client__js.js?v=3537a1de" props="{&quot;name&quot;:[0,&quot;React&quot;],&quot;desc&quot;:[0,&quot;-- UI library&quot;],&quot;link&quot;:[0,&quot;https://reactjs.org/&quot;],&quot;img&quot;:[0,&quot;https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png&quot;]}" ssr="" client="visible" before-hydration-url="/@id/astro:scripts/before-hydration.js" opts="{&quot;name&quot;:&quot;TechStackItemReact&quot;,&quot;value&quot;:true}" await-children=""><li><div><a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React"/><p>React</p></a><p class="tech-desc">-- UI library</p></div></li></astro-island>
          <div></div>
          <p></p>
          <astro-island uid="Z59tNq" component-url="/src/components/TechStackItem" component-export="default" renderer-url="/node_modules/.vite/deps/@astrojs_react_client__js.js?v=3537a1de" props="{&quot;name&quot;:[0,&quot;Sass&quot;],&quot;desc&quot;:[0,&quot;-- CSS pre-processor&quot;],&quot;link&quot;:[0,&quot;https://sass-lang.com/&quot;],&quot;img&quot;:[0,&quot;https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png&quot;]}" ssr="" client="idle" before-hydration-url="/@id/astro:scripts/before-hydration.js" opts="{&quot;name&quot;:&quot;TechStackItemReact&quot;,&quot;value&quot;:true}" await-children=""><li><div><a href="https://sass-lang.com/" target="_blank" rel="noreferrer"><img src="https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png" alt="Sass"/><p>Sass</p></a><p class="tech-desc">-- CSS pre-processor</p></div></li></astro-island>
          <astro-island uid="P4uv4" component-url="/src/components/TechStackItem.svelte" component-export="default" renderer-url="/node_modules/.vite/deps/@astrojs_svelte_client__js.js?v=3537a1de" props="{&quot;name&quot;:[0,&quot;Svelte&quot;],&quot;desc&quot;:[0,&quot;-- trendy frontend library&quot;],&quot;link&quot;:[0,&quot;https://svelte.dev/&quot;],&quot;img&quot;:[0,&quot;https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Svelte_logo_by_gengns.svg/514px-Svelte_logo_by_gengns.svg.png&quot;]}" ssr="" client="load" before-hydration-url="/@id/astro:scripts/before-hydration.js" opts="{&quot;name&quot;:&quot;TechStackItemSvelte&quot;,&quot;value&quot;:true}" await-children=""><li><div><a href="https://svelte.dev/" target="_blank" rel="noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Svelte_logo_by_gengns.svg/514px-Svelte_logo_by_gengns.svg.png" alt="Svelte"><p>Svelte</p></a><p class="tech-desc">-- trendy frontend library</p></div></li></astro-island>
        </body>
      </html>
    `);
    const document = dom.window.document;

    // populate the islands array
    const walker = document.createTreeWalker(document.documentElement);

    const islands = [];

    while (walker.nextNode()) {
      let current = walker.currentNode;
      if (current.tagName === 'ASTRO-ISLAND') {
        // store the current node contents in a string
        const astroIsland = [...current.attributes]
          .map(({ value, name }) => `${name}=${value}`)
          .join();

        // grab the framework type from the current node
        const frameworkType = astroIsland.match(/@astrojs_([^_]*)_/)[1];

        // grab the client directive from the current node
        const hydrationType = astroIsland
          .match(/client=([^_]*)/)[1]
          .split(',')[0];

        // grab all the props from the current node
        // const componentProps = JSON.parse('{' + astroIsland.match(/props={([^}]*)}/)[1] + '}');
        const componentProps = astroIsland.match(/props={([^}]*)}/)[1];

        // create an object for each astro island to hold info about which framework it's associated with, its props, and its client directive
        islands.push({
          framework: frameworkType,
          hydration: hydrationType,
          props: componentProps,
        });
      }
    }

    expect(islands).toHaveLength(3);
    expect(islands[0].framework).not.toBe(null);
  });
});
