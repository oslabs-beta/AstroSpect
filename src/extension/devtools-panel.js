// creates panel in Chrome Dev Tools
chrome.devtools.panels.create('Astro Panel', 'download.png', 'panel.html');

// logs the devtools.html code to the console (when our panel is inspected)
console.log(document.documentElement.innerHTML);


// Strategy 1: take data from Elements panel at display it ours

// Strategy 2: take source code from page and display it in panel
