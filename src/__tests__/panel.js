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
      <header></header>
      <div><h1></h1></div>
      <p>inner text</p>
      <footer></footer>
    </body>
  </html>
`)
/*
<!DOCTYPE html>
  <html>
  <head></head>
    <body>
      <header></header>
      <div>
        <h1></h1>
      </div>
      <p>inner text</p>
      <footer></footer>
    </body>
  </html>*/
const document = dom.window.document;
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);

// console.log(walker.firstChild().innerHTML);

const treeMaker = (walker) => {
  let currentNode = walker.nextNode();
  let counter = 10;
  while (currentNode) {
    const elem = (
      <TreeItem
        nodeId={counter.toString()}
        label={currentNode.tagName}
      ></TreeItem>
    );
    treeArray.push(elem);
    console.log(elem);
    console.log(walker.currentNode.tagName);
    counter += 1;
    currentNode = walker.nextSibling();
  }
  console.log(currentNode);
};
treeMaker(walker);
console.log(treeArray);

treeMaker(walker);