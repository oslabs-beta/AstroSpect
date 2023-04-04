import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ElementView from '../components/ElementView';
import ComponentView from '../components/ComponentView.jsx';
import createTree from '../algorithms/createTree';

const Panel = (props) => {
  const { html, handleClick, addIslandData, idArray, addId } = props;
  const [expanded, setExpanded] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [elementData, setElementData] = useState(null);
  const [componentData, setComponentData] = useState(null);

  // alternates between expanding and collapsing all nodes
  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? idArray : []));
  };

  // updates expanded nodes on toggle of individual nodes
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  useEffect(() => {
    // Creates a tree of target HTML DOM represenataion | Uses MUI Tree-item components
    const { allElements, allIslands } = createTree(
      html.body,
      '0',
      addId,
      addIslandData
    );
    setElementData(allElements.props.children);
    setComponentData([...allIslands]);
  }, []);

  // returns the completed tree
  return (
    <div id='panel-container'>
      <div id='panel-header'>
        <div id='panel-toggle'>
          <button
            className={`buttonToggle button0 ${
              selectedTab === 0 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(0)}
          >
            All Elements
          </button>
          <button
            className={`buttonToggle button1 ${
              selectedTab === 1 ? 'active' : ''
            }`}
            onClick={() => setSelectedTab(1)}
          >
            Islands Only
          </button>
        </div>
        <SearchBar handleExpandClick={handleExpandClick} expanded={expanded} />
      </div>
      <div className='container element' style={{ display: 'flex' }}>
        {selectedTab === 0 && (
          <ElementView
            html={html}
            handleClick={handleClick}
            expanded={expanded}
            handleToggle={handleToggle}
            elementData={elementData}
          />
        )}
        {selectedTab === 1 && (
          <ComponentView
            componentData={componentData}
            handleToggle={handleToggle}
            handleClick={handleClick}
            expanded={expanded}
          />
        )}
      </div>
    </div>
  );
};

export default Panel;
