var storage = chrome.storage.local;

function getDataFromDOM() {
  var product = {};
  product.title = document.querySelector('meta[property="og:title"]').content;
  product.url = document.querySelector('meta[property="og:url"]').content;
  product.price = 300;
  product.shop = document.querySelector('meta[property="og:site_name"]').content;
  product.img = document.querySelector('meta[property="og:image"]').content;
  console.log("product in js", product)
  return product;
}

$(function() {
  var optionsUrl = chrome.extension.getURL('options.html');
  var product = null;

  chrome.tabs.executeScript({ code: '(' + getDataFromDOM + ')();' }, (results) => {
    product = results[0];
    product.timestamp = Math.floor(Date.now() / 1000);

    $('#product_title').text(product.title);
    $('#product_url').text(product.url);
    $('#product_price').text(product.price);
    $('#product_shop').text(product.shop);
    $('#product_img').attr('src', product.img);
  });

  $('#save_cart').click(function() {
    chrome.storage.sync.get('product_list', function(items) {
      var product_list = items.product_list || [];
      product_list.push(product);
      chrome.storage.sync.set({'product_list': product_list}, function() {
        console.log("저장되었당")
      });
    });
  });
  
  $('#go_cart').click(function() {
    chrome.tabs.create({url: optionsUrl });
  });
});
