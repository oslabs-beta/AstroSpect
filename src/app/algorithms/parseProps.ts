// parses props of astro islands for display in side pane
const parseProps = (attribute: string): Record<string, any> => {
  // parses JSON string of props attribute
  const parsed: { [k: string]: any } = JSON.parse(attribute);

  // recursively parses nested props to get rid of unnecessary data from astro-island props
  // example of how the JSON is structured coming in: { "name": "[0, "Commander Roman"]" }
  // output after running JSON object through parseProps: { name: "Commander Roman" }
  const spreader = (obj: { [k: string]: any }): void => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        let newVal: any[] = obj[key].slice(1);
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
