import React, { useState } from 'react';

function InspectElement() {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  function handleSelectButtonClick() {
    console.log('inspecting');
    setSelectMode(true);
  }

  function handleMouseOver(event) {
    if (selectMode) {
      setSelectedElement(event.target);
      setSelectMode(false);
    }
  }

  return (
    <div>
      <button onClick={handleSelectButtonClick}>Select Element</button>
      <div onMouseOver={handleMouseOver}>
        {' '}
        {/* Listen for mouseover events */}
        {/* Render your web page here */}
      </div>
      {selectedElement && (
        <div>
          {/* Display the selected element's properties and attributes here */}
        </div>
      )}
    </div>
  );
}

export default InspectElement;
