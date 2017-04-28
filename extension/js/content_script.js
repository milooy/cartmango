chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  $(document.body).click(function (e) {
    console.log("content script clicked tag : ", e.target);
    sendResponse(e.target);
  });

  return true;
});

// function onWindowLoad() {}
// window.onload = onWindowLoad;
