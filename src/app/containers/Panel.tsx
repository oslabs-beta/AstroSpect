import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ElementView from '../components/ElementView';
import ComponentView from '../components/ComponentView';
import createTree from '../algorithms/createTree';
import { HandleExpandClick, PanelProps } from '../types/types';
import type { HandleToggle } from '../types/types';

const Panel = (props: PanelProps): JSX.Element => {
  const { html, handleClick, addIslandData, idArray, addId } = props;
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [data, setData] = useState<{
    elementData: JSX.Element[];
    componentData: JSX.Element[];
  }>({
    elementData: [],
    componentData: [],
  });

  // alternates between expanding and collapsing all nodes
  const handleExpandClick: HandleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? idArray : []));
  };

  // updates expanded nodes on toggle of individual nodes
  const handleToggle: HandleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  // creates a tree of target HTML DOM represenataion upon component render; uses MUI Tree-item components
  useEffect(() => {
    const { allElements, allIslands } = createTree(
      html.body,
      '0',
      addId,
      addIslandData
    );

    // set the state of the Panel component with the elements and islands returned from calling createTree
    setData({
      elementData: allElements.props.children,
      componentData: [...allIslands],
    });
  }, []);

  // returns the panel with toggle buttons and the search bar, which displays either the element view or island view
  return (
    <div id="panel-container">
      <div id="panel-header">
        <div id="panel-toggle">
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
      <div className="container element" style={{ display: 'flex' }}>
        {selectedTab === 0 && (
          <ElementView
            elementData={data.elementData}
            handleClick={handleClick}
            handleToggle={handleToggle}
            expanded={expanded}
          />
        )}
        {selectedTab === 1 && (
          <ComponentView
            componentData={data.componentData}
            handleClick={handleClick}
            handleToggle={handleToggle}
            expanded={expanded}
          />
        )}
      </div>
    </div>
  );
};

export default Panel;
