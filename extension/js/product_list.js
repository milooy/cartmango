function onWindowLoad() {

  // console.log("background.js loaded");
  chrome.storage.sync.get("productName", function(data) {
    console.log("background returned Name : ", data);

    var ele = document.querySelector('#product_name');
    ele.innerText = data.productName;
  });

  chrome.storage.sync.get("productImage", function(data) {
    console.log("background returned Image : ", data);

    var ele = document.querySelector('#product_image');
    ele.src = data.productImage;
  });

  chrome.storage.sync.get("productUrl", function(data) {
    console.log("background returned Url : ", data);

    var ele = document.querySelector('#product_url');
    ele.href = data.productUrl;
  });

  // $("#product_name").innerText = productName;
}

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

window.onload = onWindowLoad;



/*
$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});
*/
