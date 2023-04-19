// tests createTree algorithm
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// import { TreeItem } from '@mui/lab';
// import createTree from '../app/algorithms/createTree';

xdescribe('createTree', () => {
  beforeEach(() => {
    // Reset any side effects from previous tests.
    // Assumes you have reset functions implemented for addId and addIslandData.
    addId.reset();
    addIslandData.reset();
  });

  test('creates a leaf tree item for a node without children', () => {
    const node = document.createElement('div');
    const result = createTree(node, '0');
    const { getByText } = render(result);

    expect(getByText('div')).toBeInTheDocument();
  });

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

    expect(islands).toHaveLength(3);
    expect(islands[0].framework).not.toBe(null);
  });
});
