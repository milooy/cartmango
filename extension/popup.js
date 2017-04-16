var storage = chrome.storage.local;

$(function() {
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


  var message = $('#message');
  // Check if there is CSS specified.
  storage.get('css', function(items) {
    console.log(items);
    // If there is CSS specified, inject it into the page.
    if (items.css) {
      chrome.tabs.insertCSS({code: items.css}, function() {
        if (chrome.runtime.lastError) {
          message.innerText = 'Not allowed to inject CSS into special page.';
        } else {
          message.innerText = 'Injected style!';
        }
      });
    } else {
      var product = null;
      chrome.tabs.executeScript({ code: '(' + getDataFromDOM + ')();' }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        var product = results[0];
        product.timestamp = Math.floor(Date.now() / 1000);

        chrome.storage.sync.get('product_list', function(items) {
          var product_list = items.product_list || [];
          product_list.push(product);
          chrome.storage.sync.set({'product_list': product_list}, function() {
            console.log("저장되었당")
          });
        });

        $('#product_title').text(product.title);
        $('#product_url').text(product.url);
        $('#product_price').text(product.price);
        $('#product_shop').text(product.shop);
        $('#product_img').attr('src', product.img);


      });

      /* 카트 리스트 보러가기 */
      var optionsUrl = chrome.extension.getURL('options.html');
      $('#save_cart').click(function() {
        chrome.tabs.create({url: optionsUrl });
      })
    }
  });




});
