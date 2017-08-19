// 브라우저에 로딩된 웹 페이지 DOM 에 접근
function domInspector() {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    port = chrome.tabs.connect(tabs[0].id, {name: "msg"});

    var tab = tabs[0];
    var url = tab.url;

    chrome.tabs.sendRequest(tab.id, {action: "getPrice"}, function(response) {
      console.log("response : ", response);
    });
  });

}

function onWindowLoad() {
  // Popup html 의 가격 선택 버튼
  // $("#pick_price").click(function () {
  //   domInspector();
  // });

  // chrome.tabs.executeScript(null, {
  //   file: "js/getPageSource.js"
  // }, function() {
  //   // If you try and inject into an extensions page or the webstore/NTP you'll get an error
  //   if (chrome.runtime.lastError) {
  //     message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
  //   }
  // });

  // $(document).click(function (event) {
  //   console.log("clicked tag is : ", event.target);
  //   var price = event.target;
  //
  //   chrome.runtime.sendMessage({"dom" : price});
  // });


  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
   if (request.action == "getDOM") {
     $(document).click(function (event) {
      //  console.log("clicked tag is : ", event.target);
       var price = event.target;
       sendResponse({dom: "this is what you want?"});
     });
   }
   else
     sendResponse({}); // Send nothing..
  });
}

window.onload = onWindowLoad;
