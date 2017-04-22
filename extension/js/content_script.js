// 브라우저에 로딩된 웹 페이지 DOM 에 접근
function domInspector() {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    chrome.tabs.sendRequest(tab.id, {action: "getPrice"}, function(response) {
      // console.log(response);
    });
  });
}

function onWindowLoad() {
  // Popup html 의 가격 선택 버튼
  $("#pick_price").click(function () {
    domInspector();
  });

  chrome.tabs.executeScript(null, {
    file: "js/getPageSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;
