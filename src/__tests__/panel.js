import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <header><astro-island uid="Z59tNq" component-url="/src/components/TechStackItem" component-export="default" renderer-url="/node_modules/.vite/deps/@astrojs_react_client__js.js?v=3537a1de" props="{&quot;name&quot;:[0,&quot;Sass&quot;],&quot;desc&quot;:[0,&quot;-- CSS pre-processor&quot;],&quot;link&quot;:[0,&quot;https://sass-lang.com/&quot;],&quot;img&quot;:[0,&quot;https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png&quot;]}" ssr="" client="idle" before-hydration-url="/@id/astro:scripts/before-hydration.js" opts="{&quot;name&quot;:&quot;TechStackItemReact&quot;,&quot;value&quot;:true}" await-children=""><li><div><a href="https://sass-lang.com/" target="_blank" rel="noreferrer"><img src="https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png" alt="Sass"/><p>Sass</p></a><p class="tech-desc">-- CSS pre-processor</p></div></li></astro-island></header>
      <div><h1></h1></div>
      <p>inner text</p>
      <astro-island uid="Z2ipzgK" component-url="/_astro/SidebarToggleTabGroup.c5a426dd.js" component-export="default" renderer-url="/_astro/client.bdae2c91.js" props="{&quot;defaultActiveTab&quot;:[0,&quot;learn&quot;],&quot;labels&quot;:[0,{&quot;learn&quot;:[0,&quot;Learn&quot;],&quot;api&quot;:[0,&quot;Reference&quot;]}],&quot;class&quot;:[0,&quot;astro-KQNE5HRN&quot;]}" client="load" opts="{&quot;name&quot;:&quot;SidebarToggleTabGroup&quot;,&quot;value&quot;:true}" await-children=""><div class="TabGroup"><button class="active">Learn</button><button class="">Reference</button></div></astro-island>
      <footer></footer>
    </body>
  </html>
`);

const document = dom.window.document;
const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

// save all the nodes that are Astro Islands
const astroIslands = [];

// parse through a tree of nodes and return a nested JSX structure that we can plug in to MUI
const createTree = (node, id, astroCount = 0) => {
  const children = Array.from(node.children);
  if (node.nodeName === 'ASTRO-ISLAND') {
    let componentFile = node.attributes['component-url'].value;
    for (let i = componentFile.length - 1; i > 0; i--) {
      let lastIndex = null;
      if (componentFile[i] === '.') {
        lastIndex = i;
      }
      if (componentFile[i] === '/') {
        if (lastIndex) componentFile = componentFile.slice(i + 1, lastIndex);
        else componentFile = componentFile.slice(i + 1);
        break;
      }
    }
    astroIslands.push(node);
    astroCount++;
  }
  if (children.length === 0) {
    return <TreeItem key={id} nodeId={id} label={`<${node.nodeName}>`} />;
  }

  return (
    <TreeItem key={id} nodeId={id} label={`<${node.nodeName}>`}>
      {children.map((child, index) => createTree(child, `${id}-${index}`))}
    </TreeItem>
  );
};

const treeJSX = createTree(document.body, '0');

// expect astroIslands length to be ___
