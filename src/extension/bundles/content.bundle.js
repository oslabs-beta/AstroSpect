/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/extension/main.js ***!
  \*******************************/
// // should access code of website in the current window

// // tests for console
// // console.log('Hii');

// // const tree = document.querySelectorAll('*');

// // console.log(tree[1]);
// // console.log(tree);

// const walker = document.createTreeWalker(
//   document.documentElement,
//   NodeFilter.SHOW_ELEMENT
// );

// const islands = [];

// while (walker.nextNode()) {
//   let current = walker.currentNode;
//   if (current.tagName === 'ASTRO-ISLAND') {
//     console.log(
//       current.tagName,
//       [...current.attributes]
//         .map(({ value, name }) => `${name}=${value}`)
//         .join()
//     );

//     islands.push(
//       [...current.attributes]
//         .map(({ value, name }) => `${name}=${value}`)
//         .join()
//     );
//   }
// }
// // // Define an async function to retrieve the target page's HTML
// // async function getTargetPageHTML() {
// //   console.log('Attempting to retrieve dom tree from target html');
// //   // Use chrome.devtools.inspectedWindow.eval() to retrieve the page's HTML
// //   const html = await new Promise((resolve, reject) => {
// //     chrome.devtools.inspectedWindow.eval(
// //       'document.documentElement.outerHTML',
// //       (result, exception) => {
// //         if (exception) {
// //           reject(exception);
// //         } else {
// //           resolve(result);
// //         }
// //       }
// //     );
// //   });

// //   return html;
// // }

// // // Call the getTargetPageHTML() function and render the HTML in the dev tools panel
// // (async () => {
// //   try {
// //     const html = await getTargetPageHTML();
// //     const domTreeContainer = document.getElementById('dom-tree');
// //     domTreeContainer.innerHTML = html;
// //   } catch (error) {
// //     console.error(error);
// //   }
// // })();

// console.log(
//   islands[0].substring(
//     islands[0].indexOf('client=') + 7,
//     islands[0].indexOf('client=') + 11
//   )
// );
/******/ })()
;
//# sourceMappingURL=content.bundle.js.map