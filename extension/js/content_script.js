
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

// 상품정보 DB에 저장하기
function saveProductInfo(data) {
  chrome.storage.sync.set({"productName": data.productName, "productImage": data.productImage, "productUrl": data.productUrl}, function() {
    console.log("product saved to the storage.");

    // Notify that we saved.
    // message('Product saved');
  });
}

// 상품정보 DB에서 가져오기
function getProductInfo() {
  chrome.storage.sync.get("productName", function(data) {
    console.log("returned data : ",data);
  });
}

// content_script.js 의 $ 접근은, 크롬 익스텐션에서 실행한 popup 페이지의 DOM 접근이다.
function onWindowLoad() {


  chrome.tabs.getSelected(null, function(tab) {
      console.log("tabUrl : " , tab.url);
  });

  $("button").click(function() {
    console.log("clicked");

    // 아래와 같은 ajax 콜로 서버로 해당 데이터를 보낼 수 있다.
    // $.ajax({url: "http://query.yahooapis.com/v1/public/yql?q=select woeid from geo.placefinder where text='35,126' and gflags='R'&format=json",
    //   success: function(result){
    //       console.log("ajax result : ", result);
    //   }});
  });

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
