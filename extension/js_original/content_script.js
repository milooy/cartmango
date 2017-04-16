// 페이지 역할 : Extension Popup.html 의 DOM 접근

chrome.runtime.onMessage.addListener(function(request, sender) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    chrome.tabs.sendRequest(tab.id, {action: "getDocument"}, function(response) {
      console.log("상품 가격 : ", response.price);
      product_price.innerText = response.price + '원';
      chrome.storage.local.set({"price" : response.price});
    });
  });

  // chrome.tabs.getSelected(null, function(tab) {
  //   chrome.tabs.sendRequest(tab.id, {action: "getDocument"}, function(response) {
  //     console.log("상품 가격 : ", response.price);
  //     product_price.innerText = response.price + '원';
  //     chrome.storage.local.set({"price" : response.price});
  //   });
  // });

  if (request.action == "getProductInfo") {
    // console.log(request);

    var product = request.source;
    product_image.src = product.productImage;
    product_name.innerText = product.productName;
    product_url.href = product.productUrl;
    product_site.innerText = product.productSiteElement;
  }

  // if (request.action == "getProductPrice") {
  //   product_price.innerText = request.source.productPrice;
  // }

  saveProductInfo(request.source);
  // getProductInfo();
});

// 가격 태그 검사 및 가져오기
function domInspector() {
  // 브라우저에 로딩된 웹 페이지 DOM 에 접근
  // var price = "";

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    chrome.tabs.sendRequest(tab.id, {action: "getDocument"}, function(response) {
      console.log("상품 가격 : ", response.price);
      product_price.innerText = response.price + '원';
      chrome.storage.local.set({"price" : response.price});
    });
  });

  // return price;
}

// 상품정보 DB에 저장하기
function saveProductInfo(data) {

  // 데이터 모델 객체 생성
  // key : 상품명
  // value : 상품정보(상품명, 이미지, URL)
  var key = data.productName;
  var dataModel = {};

  // 가격 가져오기
  chrome.storage.local.get("price", function (result) {
    console.log("local result : ", result);
    // 가격 모델에 저장
    data.price = result.price;
    console.log("product data in local storage : ", data);

    dataModel[key] = data;
    console.log("product data after local storage : ", data);
    chrome.storage.sync.set(dataModel, function() {
      console.log("product saved to the storage.");

      // Notify that we saved.
      // message('Product saved!!');
    });
  });

}

// content_script.js 의 $ 접근은, 크롬 익스텐션에서 실행한 popup 페이지의 DOM 접근이다.
function onWindowLoad() {

  // getCurrentTabId();

  domInspector();



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

  /* 카트에 저장 버튼 */
  $("#save_cart").click(function() {
    console.log("히잉")
    message('Error: No value specified');
    // var theValue = textarea.value;
    // if (!theValue) {
    //   message('Error: No value specified');
    //   return;
    // }
    // chrome.storage.sync.set({'value': theValue}, function() {
    //   message('Settings saved');
    // });

    // chrome.tabs.create({url: "http://localhost:8000/list/" });
  });

  // $("button").click(function() {
  //   console.log("clicked");
  //
  //   // 아래와 같은 ajax 콜로 서버로 해당 데이터를 보낼 수 있다.
  //   // $.ajax({url: "http://query.yahooapis.com/v1/public/yql?q=select woeid from geo.placefinder where text='35,126' and gflags='R'&format=json",
  //   //   success: function(result){
  //   //       console.log("ajax result : ", result);
  //   //   }});
  // });

}

window.onload = onWindowLoad;



// 현재 열린 tab 의 url 반환
// function getCurrentUrl() {
//   chrome.tabs.getSelected(null, function(tab) {
//       console.log("tabUrl : " , tab.url);
//   });
// }
