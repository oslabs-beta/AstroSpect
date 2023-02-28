import React from 'react';

// side pane for displaying props and client
const SidePane = (props) => {
  // get the properties from current component
  const { currentComp } = props;
  return (
    <div className={'side-pane'}>
      {/* // when component is not astro island */}
      {!currentComp && <p>No hydrated component selected</p>}

      {/* // when clicked is Astro Island */}
      {currentComp && (
        <>
          <h3>Type: </h3>
          <p>Astro Island</p>
          <hr />
          <h3>Props: </h3>
          <p>{currentComp.props}</p>
          <hr />
          <h3>Client Directive:</h3>
          <p> {currentComp.client}</p>
        </>
      )}
    </div>
  );
};

export default SidePane;
