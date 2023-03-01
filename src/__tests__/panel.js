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
      <astro-island uid="1mSS4I" component-url="/src/components/TechStackItem" component-export="default" renderer-url="/node_modules/.vite/deps/@astrojs_react_client__js.js?v=3537a1de" props="{&quot;name&quot;:[0,&quot;React&quot;],&quot;desc&quot;:[0,&quot;-- UI library&quot;],&quot;link&quot;:[0,&quot;https://reactjs.org/&quot;],&quot;img&quot;:[0,&quot;https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png&quot;]}" ssr="" client="visible" before-hydration-url="/@id/astro:scripts/before-hydration.js" opts="{&quot;name&quot;:&quot;TechStackItemReact&quot;,&quot;value&quot;:true}" await-children=""><li><div><a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React"/><p>React</p></a><p class="tech-desc">-- UI library</p></div></li></astro-island>
      <footer></footer>
    </body>
  </html>
`)

const document = dom.window.document;
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);

// save all the nodes that are Astro Islands
const astroIslands = [];

// parse through a tree of nodes and return a nested JSX structure that we can plug in to MUI
const createTree = (node, id, astroCount = 0) => {
  console.log(node)
  const children = Array.from(node.children);
  console.log(children)
  if (node.nodeName === "ASTRO-ISLAND") {
    astroIslands.push(node);
    astroCount++
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
console.log(treeJSX)
// expect astroIslands length to be ___

// console.log(astroIslands)
// console.log(astroIslands.length)
// console.log(treeJSX.props.children)