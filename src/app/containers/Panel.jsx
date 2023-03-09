import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import PanelViewToggle from '../components/PanelViewToggle';
import { useState } from 'react';
import ElementView from '../components/ElementView';
import ComponentView from '../components/ComponentView.jsx';

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
        <div id="panel-toggle">
          <button
            className={`buttonToggle button0 ${
              selectedTab === 0 ? 'active' : ''
            }`}
            active={selectedTab === 0}
            onClick={() => setSelectedTab(0)}
          >
            Elements
          </button>
          <button
            className={`buttonToggle button1 ${
              selectedTab === 1 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(1)}
          >
            Components
          </button>
        </div>
        <SearchBar handleExpandClick={handleExpandClick} expanded={expanded} />
      </div>
      <div
        className="container element"
        style={{ display: selectedTab === 0 ? 'flex' : 'none' }}
      >
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
      <div
        className="container component"
        style={{ display: selectedTab === 1 ? 'flex' : 'none' }}
      >
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
