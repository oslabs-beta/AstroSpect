// parses props of astro islands for display in side pane
const parseProps = (attribute) => {
  // parses JSON string of props attribute
  const parsed = JSON.parse(attribute);
  // recursively parses nested props 
  const spreader = (obj) => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        let newVal = obj[key].slice(1);
        obj[key] = newVal[0];
        spreader(obj[key]);
      }
    }
  };
  // calls spreader helper function
  spreader(parsed);
  // returns object of parsed props
  return parsed;
};

export default parseProps;
