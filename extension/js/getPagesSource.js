// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);


function getProductInfo(doc) {

  var productNameElement = document.querySelector('meta[property="og:title"]').content;
  var productImageElement = document.querySelector('meta[property="og:image"]').content;
  var productUrlElement = document.querySelector('meta[property="og:url"]').content;

  var product = {
    "productName" : productNameElement,
    "productImage" : productImageElement,
    "productUrl" : productUrlElement
  }

  return product;
}

function getProductPrice() {
  /*  1) 쿠팡
  <div class="prod-price__origin ">
    <span id="totalPrice">5,900</span>원
      <span class="prod-delivery__title-badge">
        <img src="//img2a.coupangcdn.com/image/coupang/product/badge-rocket__2x.png" class="prod-delivery__rocket">
      </span>
  </div>
  */
  /*  2) GSShop
  <div class="price_info">
    <div class="price_big">
      <div class="price-definition">
        <div class="price-definition-upper">
          <del>351,000</del>원
        </div>
        <div class="price-definition-base">
        <span class="price-definition-gs"><em>GS</em>가</span>
        <span class="price-definition-ins"><ins><strong>343,980</strong></ins>원

  <div class="purchase-merit-substance-single">
    <strong> 319,902원 </strong>
  </div>
  */
  

}

chrome.runtime.sendMessage({
    action: "getProductInfo",
    source: getProductInfo(document)
});

chrome.runtime.sendMessage({
    action: "getProductInfo",
    source: getProductInfo(document)
});
