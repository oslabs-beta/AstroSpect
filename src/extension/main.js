// // Define an async function to retrieve the target page's HTML
// async function getTargetPageHTML() {
//   console.log('Attempting to retrieve dom tree from target html');
//   // Use chrome.devtools.inspectedWindow.eval() to retrieve the page's HTML
//   const html = await new Promise((resolve, reject) => {
//     chrome.devtools.inspectedWindow.eval(
//       'document.documentElement.outerHTML',
//       (result, exception) => {
//         if (exception) {
//           reject(exception);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });

//   return html;
// }

// // Call the getTargetPageHTML() function and render the HTML in the dev tools panel
// (async () => {
//   try {
//     const html = await getTargetPageHTML();
//     const domTreeContainer = document.getElementById('dom-tree');
//     domTreeContainer.innerHTML = html;
//   } catch (error) {
//     console.error(error);
//   }
// })();
