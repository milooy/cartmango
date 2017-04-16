function onWindowLoad() {

  var productList = ["productName", "productImage", "productUrl"];

  // 상품 리스트 표시
  chrome.storage.sync.get(null, function(data) {
    console.log("data list : ", data);

    for (var key in data) {
      var productName = data[key].productName;
      var productImage = data[key].productImage;
      var productUrl = data[key].productUrl;
      // if (data.hasOwnProperty(key)) {
      //   console.log(key + " : " + data[key]);
      // }
      console.log(key + "'s 제품 정보는 : " + productName + productImage + productUrl);

      $("ul").append("<li><img style=\"height:150px; width:150px; padding:10px 10px;\" src="+productImage+"><span>"+productName+"</span><a href="+productUrl+" style=\"margin-left: 10px;\" class=\"btn btn-primary btn-lg active\" role=\"button\">상품 페이지</a><br></li>");
    }


    // html 페이지에 입력
    // var ele = document.querySelector('#product_name');
    // ele.innerText = data.productName;
    // ele = document.querySelector('#product_image');
    // ele.src = data.productImage;
    // ele = document.querySelector('#product_url');
    // ele.href = data.productUrl;
  });

}

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
});

window.onload = onWindowLoad;



/*
$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});
*/
