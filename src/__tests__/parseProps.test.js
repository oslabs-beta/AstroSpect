// tests parseProps algorithm
const parseProps = require('../app/algorithms/parseProps').default;

describe('parseProps ', () => {
  it('returns object for one prop', () => {
    const unparsedProps = '{"hello": "world"}';

    const parsedProps = parseProps(unparsedProps);

    expect(parsedProps).toEqual({ hello: 'world' });
  });

  it('returns object for multiple, properly formatted, non-nested props', () => {
    // create a DOM environment and load a test document

    const unparsedProps = '{"hello": "world", "number": 2}';

    const parsedProps = parseProps(unparsedProps);

    expect(parsedProps).toEqual({ hello: 'world', number: 2 });
  });

  it('returns object for multiple, properly formatted, nested props', () => {
    // create a DOM environment and load a test document
    const unparsedProps = `{"labels": {"useLight": "Use light theme","useDark": "Use dark theme"},"isInsideHeader": true,"class": "astro-2W66RQV5"}`;

    const parsedProps = parseProps(unparsedProps);

    const targetObj = {
      labels: {
        useLight: 'Use light theme',
        useDark: 'Use dark theme',
      },
      isInsideHeader: true,
      class: 'astro-2W66RQV5',
    };

    expect(parsedProps).toEqual(targetObj);
  });

  it('returns object for multiple, properly formatted, nested props', () => {
    // create a DOM environment and load a test document

    const unparsedProps = `{"labels":[0,{"useLight":[0,"Use light theme"],"useDark":[0,"Use dark theme"]}],"isInsideHeader":[0,true],"class":[0,"astro-2W66RQV5"]}`;

    const parsedProps = parseProps(unparsedProps);

    const targetObj = {
      labels: {
        useLight: 'Use light theme',
        useDark: 'Use dark theme',
      },
      isInsideHeader: true,
      class: 'astro-2W66RQV5',
    };

    expect(parsedProps).toEqual(targetObj);
  });
});
