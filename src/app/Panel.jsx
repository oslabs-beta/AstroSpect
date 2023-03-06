import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import PanelViewToggle from './PanelViewToggle';
import { useState } from 'react';
import ElementView from './ElementView';
import ComponentView from './ComponentView.jsx';

// create TS type for panel props

const Panel = (props) => {
  const { html, handleClick, addIslandData, idArray, addId } = props;
  const [expanded, setExpanded] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  // alternates between expanding and collapsing all nodes
  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? idArray : []));
  };

  // returns the completed tree
  return (
    <div id="panel-container">
      <div id="panel-header">
        <SearchBar handleExpandClick={handleExpandClick} expanded={expanded} />
        <PanelViewToggle
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div style={{ display: selectedTab === 0 ? 'flex' : 'none' }}>
        <ElementView
          html={html}
          handleClick={handleClick}
          addIslandData={addIslandData}
          handleExpandClick={handleExpandClick}
          expanded={expanded}
          addId={addId}
          setExpanded={setExpanded}
        />
      </div>
      <div style={{ display: selectedTab === 1 ? 'flex' : 'none' }}>
        <ComponentView />
      </div>
    </div>
  );
};

/* for future use: filtering out nodes we don't want */
// const filterDom = () => {
//   const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT);
//   let node = walker.firstChild();
//   while (node) {
//     //filter out the all script elements
//     if (node.tagName === 'script') {
//       node.remove();
//       continue;
//     }
//     //filter out style attributes
//     if (node.hasAttribute('style')) {
//       node.removeAttribute('style');
//       continue;
//     }

//     //if the node has a child node, recurse?
//     console.log('node:', node);
//     node = walker.nextSibling();
//   }
// };

// displays tree
// must import MUI tree components

export default Panel;
