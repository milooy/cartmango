chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  $(document.all[0]).on("click" , function (e) {
    console.log(e.target);
    sendResponse(e.target);
  });

  // sendResponse("hi");
});

// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   // If the received message has the expected format...
//   if (msg.text === 'report_back') {
//     // Call the specified callback, passing
//     // the web-page's DOM content as argument
//     $(document).click(function (e) {
//       console.log("content script clicked tag : ", e.target);
//       sendResponse(e.target);
//     });
//   }
// });

// function onWindowLoad() {}
// window.onload = onWindowLoad;
