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
