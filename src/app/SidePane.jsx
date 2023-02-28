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
          <p>Type: Astro Island</p>
          <hr />
          <p>Props: {currentComp.props} </p>
          <hr />
          <p>Client Directive: {currentComp.client}</p>
        </>
      )}
    </div>
  );
};

export default SidePane;
