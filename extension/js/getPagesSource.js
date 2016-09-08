// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);


function getProductInfo(doc) {

  var productNameElement = document.querySelector('meta[property="og:title"]').content;
  var productImageElement = document.querySelector('meta[property="og:image"]').content;
  var productUrlElement = document.querySelector('meta[property="og:url"]').content;
  // console.log(" productUrlElement : ", productUrlElement);

  var product = {
    "productName" : productNameElement,
    "productImage" : productImageElement,
    "productUrl" : productUrlElement
  }

  return product;
}

chrome.runtime.sendMessage({
    action: "getProductInfo",
    source: getProductInfo(document)
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
 if (request.action == "getDOM")
   sendResponse({dom: "The dom that you want to get"});
 else
   sendResponse({}); // Send nothing..
});
