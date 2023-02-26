import React from 'react';

// side pane for displaying props and client
const SidePane = () => {
  return (
    <div className={'side-pane'}>
      <p>Type: React Component</p>
      <hr />
      <p>Props:</p>
      <hr />
      <p>Client Directive: client:load</p>
    </div>
  );
};

export default SidePane;
