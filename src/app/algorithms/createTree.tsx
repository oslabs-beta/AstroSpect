import React from 'react';
import TreeItem from '@mui/lab/TreeItem';
import parseProps from './parseProps';
import { CurrentComp } from '../types/types';

const createTree = (
  node: any,
  id: string,
  addId: (id: string) => void,
  addIslandData: (astroIsland: CurrentComp, id: string) => void,
  fontColor = '#F5F5F5'
) => {
  const allIslands: JSX.Element[] = [];
  const inner = (
    node: any,
    id: string,
    addId: (id: string) => void,
    addIslandData: (island: any, id: string) => void,
    fontColor: string = '#F5F5F5'
  ) => {
    // adds id to idArray, required for expandAll functionality
    addId(id);
    // Stores ASTRO-ISLAND data in islandData state (from app)
    if (node.nodeName === 'ASTRO-ISLAND') {
      // parse props attribute of astro-island element
      const parsedProps = parseProps(node.attributes.props.value);
      // creates island object, with client and props info
      const island = {
        client: node.attributes.client.value,
        props: parsedProps,
      };
      // saves island object to an object of all island objects
      addIslandData(island, id);
      // parses component-url attrbute to give astro-island descriptive name
      let componentFile = node.attributes['component-url'].value;
      let lastIndex: number = NaN;
      for (let i = componentFile.length - 1; i > 0; i--) {
        if (componentFile[i] === '.') lastIndex = i;
        if (componentFile[i] === '/') {
          if (lastIndex) componentFile = componentFile.slice(i + 1, lastIndex);
          else componentFile = componentFile.slice(i + 1);
          break;
        }
      }

      if (!node.children) {
        const islandTreeItem = (
          <TreeItem
            key={id}
            nodeId={id}
            label={`${node.nodeName.toLowerCase()} (${componentFile})`}
            sx={{ color: '#d494ff' }}
          />
        );
        allIslands.push(islandTreeItem);
        return islandTreeItem;
      } else {
        // when astro island has children, returns parent TreeItem (orange)
        const children = Array.from(node.children);
        const islandTreeItem = (
          <TreeItem
            key={id}
            nodeId={id}
            label={`${node.nodeName.toLowerCase()} (${componentFile})`}
            sx={{ color: '#d494ff' }}
          >
            {children.map((child, index) =>
              inner(child, `${id}-${index}`, addId, addIslandData, '#d494ffa6')
            )}
          </TreeItem>
        );
        allIslands.push(islandTreeItem);
        return islandTreeItem;
      }
    }

    // If node has no children, return node
    if (!node.children) {
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()}`}
          sx={{ color: fontColor }}
        />
      );
    } else {
      const children = Array.from(node.children);
      // If node has children, recurse through function with each child node
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()}`}
          sx={{ color: fontColor }}
        >
          {children.map((child, index) =>
            inner(child, `${id}-${index}`, addId, addIslandData, fontColor)
          )}
        </TreeItem>
      );
    }
  };
  const allElements = inner(
    node,
    id,
    addId,
    addIslandData,
    (fontColor = '#F5F5F5')
  );
  return {
    allElements,
    allIslands,
  };
};
export default createTree;
