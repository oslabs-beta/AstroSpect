// should access code of website in the current window

// tests for console
// console.log('Hii');

// const tree = document.querySelectorAll('*');

// console.log(tree[1]);
// console.log(tree);

const walker = document.createTreeWalker(
  document.documentElement,
  NodeFilter.SHOW_ELEMENT
);

const islands = [];

while (walker.nextNode()) {
  let current = walker.currentNode;
  if (current.tagName === 'ASTRO-ISLAND') {
    console.log(
      current.tagName,
      [...current.attributes].map(({value,name}) => `${name}=${value}`).join()
    );

    islands.push([...current.attributes].map(({value,name}) => `${name}=${value}`).join());
  }
}

console.log(islands[0].substring(islands[0].indexOf('client=') + 7, islands[0].indexOf('client=') + 11));