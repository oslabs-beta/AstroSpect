const parseProps = (attribute) => {
  const parsed = JSON.parse(attribute);

  const spreader = (obj) => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        let newVal = obj[key].slice(1);
        obj[key] = newVal[0];
        spreader(obj[key]);
      }
    }
  };

  spreader(parsed);
  return parsed;
};

export default parseProps;
