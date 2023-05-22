// tests createTree algorithm
const { JSDOM } = require('jsdom');
const createTree = require('../app/algorithms/createTree').default;

describe('createTree', () => {
  //mock functions
  let mockAddId = jest.fn();
  let mockAddIslandData = jest.fn();

  function countNodes(tree: JSX.Element) {
    let count = 1; // Count the current node
    for (const child of tree.props.children || []) {
      count += countNodes(child); // Recursively count children
    }
    return count;
  }

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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('creates a leaf tree item for a node without children', () => {
    const node = document.createElement('div');
    const result = createTree(node, '0', mockAddId, mockAddIslandData);
    expect(result).not.toBeNull();
  });

  it('returned object should have the allElements property', () => {
    // create a DOM environment and load a test document
    expect(
      createTree(document, '0', mockAddId, mockAddIslandData)
    ).toHaveProperty('allElements');
  });

  it('returned object should have allIslands property', () => {
    expect(
      createTree(document, '0', mockAddId, mockAddIslandData)
    ).toHaveProperty('allIslands');
  });

  it('calls addId the correct number of times', () => {
    createTree(document.body, '0', mockAddId, mockAddIslandData);
    //+ 1 to include body element.
    const expectedCalls = document.body.querySelectorAll('*').length + 1;
    expect(mockAddId.mock.calls.length).toEqual(expectedCalls);
  });

  it('calls addId the correct number of times', () => {
    createTree(document, '0', mockAddId, mockAddIslandData);
    const expectedCalls = document.querySelectorAll('astro-island').length;
    expect(mockAddIslandData.mock.calls.length).toEqual(expectedCalls);
  });

  it('returns the correct number of allElements', () => {
    const { allElements } = createTree(
      document.body,
      '0',
      mockAddId,
      mockAddIslandData
    );
    const givenLength = countNodes(allElements);
    //+ 1 to include body as well.
    const expectedLength =
      Array.from(document.body.querySelectorAll('*')).length + 1;
    expect(givenLength).toEqual(expectedLength);
  });

  it('returns the correct number of allIslands', () => {
    const { allIslands } = createTree(
      document,
      '0',
      mockAddId,
      mockAddIslandData
    );
    const expectedLength = document.querySelectorAll('astro-island').length;
    expect(allIslands.length).toEqual(expectedLength);
  });

  it('handles large documents efficiently', () => {
    // Generate a large document with nested 'ASTRO-ISLAND' elements.
    let largeHTMLString = '<div>';
    for (let i = 0; i < 100; i++) {
      largeHTMLString += `<ASTRO-ISLAND client="astro_client_${i}" props='{"propKey": "propValue"}' component-url="/path/to/component${i}">`;
      for (let j = 0; j < 100; j++) {
        largeHTMLString += `<p>Element ${i}-${j}</p>`;
      }
      largeHTMLString += '</ASTRO-ISLAND>';
    }
    largeHTMLString += '</div>';

    const dom = new JSDOM(largeHTMLString);
    const document = dom.window.document;

    // Start the timer
    const startTime = performance.now();

    // Run the function
    createTree(document, '0', mockAddId, mockAddIslandData);

    // End the timer
    const endTime = performance.now();
    console.log('time:', endTime - startTime);

    // Check the elapsed time. Update this number to whatever maximum
    // time you consider acceptable.
    expect(endTime - startTime).toBeLessThan(500); // 500 ms
  });
});
