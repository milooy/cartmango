// document.addEventListener('DOMContentLoaded', function() {
//   console.log("content loaded");
//   console.log("Meta description property : ", $('meta[property="og:description"]'));
// });


chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getProductInfo") {
    // console.log(request);

    var product = request.source;
    product_image.src = product.productImage;
    product_name.innerText = product.productName;
    product_url.href = product.productUrl;
  }

  if (request.action == "getProductPrice") {
    product_price.innerText = request.source.productPrice;
  }

  saveProductInfo(request.source);
  getProductInfo();
});

function saveProductInfo(data) {
  chrome.storage.sync.set({"productName": data.productName, "productImage": data.productImage, "productUrl": data.productUrl}, function() {
    console.log("product saved to the storage.");

    // Notify that we saved.
    // message('Product saved');
  });
}

function getProductInfo() {
  chrome.storage.sync.get("productName", function(data) {
    console.log("returned data : ",data);
  });
}

function onWindowLoad() {

  var product_image = document.querySelector('#product_image');
  var product_name = document.querySelector('#product_name');
  var product_url = document.querySelector('#product_url');
  var product_price = document.querySelector('#product_price');

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "js/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
