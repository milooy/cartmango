

function getDataFromDOM() {
  var product = {};
  function getTitle() {
    var title = $('meta[property="og:title"]').attr('content') || $('meta[name="title"]').attr('content');
    if(title) {
      return title;
    }
    return '타이틀 몰라';
  }

  function getUrl() {
    var url = $('meta[property="og:url"]').attr('content');
    if(url) {
      return url;
    }
    return window.location.href;
  }

  function getPrice() {
    return 300;
  }

  function getShop() {
    var shop = $('meta[property="og:site_name"]').attr('content');
    if(shop) {
      return shop;
    }
    var host = window.location.host;
    return host.startsWith('www.')? host.substring(4) : host;
  }

  function getImg() {
    var img = $('meta[property="og:image"]').attr('content');
    if(img) {
      if(img.startsWith("//")) {
        return "http://" + img;
      }
      return img;
    }
    return '';
  }

  product.title = getTitle();
  product.url = getUrl();
  product.price = getPrice();
  product.shop = getShop();
  product.img = getImg();

  console.log("product in js", product)
  return product;
}

$(function() {
  var storage = chrome.storage.local;
  var pageUrl = chrome.extension.getURL('page.html');
  var product = null;
  chrome.tabs.executeScript(null, { file: "jquery.js" }, function() {
    chrome.tabs.executeScript({ code: '(' + getDataFromDOM + ')();' }, (results) => {
      product = results[0];
      product.timestamp = Math.floor(Date.now() / 1000);

      $('#product_title').text(product.title);
      $('#product_url').text(product.url);
      $('#product_price').text(product.price);
      $('#product_shop').text(product.shop);
      $('#product_img').attr('src', product.img);
    });
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
    chrome.tabs.create({url: pageUrl });
  });

  // 4.21(금), added
  $('#pick_price').click(function() {
    pickPrice();
  });
});

function pickPrice() {
  chrome.tabs.query({currentWindow: true, active : true}, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, {text: 'report_back'}, function (response) {
      console.log('I received the following DOM content:\n' , response);
    });
  });
}
