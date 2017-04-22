chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.action == "getPrice") {
    // 상품 페이지의 가격 선택
    $(document).click(function(e) {
      // console.log("clicked tag : ", e.target);
      sendResponse({dom: e.target});
    });
  }
});
