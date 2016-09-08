// 페이지 역할 : 브라우저에 로딩된 페이지의 DOM 접근

function getProductInfo(doc) {

  var productNameElement = document.querySelector('meta[property="og:title"]').content;
  var productImageElement = document.querySelector('meta[property="og:image"]').content;
  var productUrlElement = document.querySelector('meta[property="og:url"]').content;
  var productSiteElement = document.querySelector('meta[property="og:site_name"]').content;
  // console.log(" productUrlElement : ", productUrlElement);

  var product = {
    "productName" : productNameElement,
    "productImage" : productImageElement,
    "productUrl" : productUrlElement,
    "productSiteElement" : productSiteElement
  }

  return product;
}

chrome.runtime.sendMessage({
    action: "getProductInfo",
    source: getProductInfo(document)
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

 if (request.action == "getDocument") {


   // GS Shop 물품 가격 선택 로직
  //  console.log("document strong : ", $(".price_big").find("strong")[0].innerText );
   var chosenPrice = $(".price_big").find("strong")[0].innerText;
   sendResponse({price: chosenPrice});

   // 핑크퐁 북스토어 가격 선택 로직
  //  var chosenPrice = $(".price").find("strong")[0].innerText;
  //  sendResponse({price: chosenPrice});

   // 사용자가 직접 가격 선택 로직
  //  $(document).click(function (e) {
  //    console.log("clicked tag : ", e.target);
  //    sendResponse({dom: e.target});
  //  });

  } else if (request.action == "getTabId") {
    console.log("sender is : ",sender);
  }

});
