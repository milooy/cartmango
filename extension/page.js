// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Store CSS data in the "local" storage area.
//
// Usually we try to store settings in the "sync" area since a lot of the time
// it will be a better user experience for settings to automatically sync
// between browsers.
//
// However, "sync" is expensive with a strict quota (both in storage space and
// bandwidth) so data that may be as large and updated as frequently as the CSS
// may not be suitable.
var storage = chrome.storage.local;

// Get at the DOM controls used in the sample.
var resetButton = document.querySelector('button.reset');
var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');

// Load any CSS that may have previously been saved.
loadChanges();

// submitButton.addEventListener('click', saveChanges);
// resetButton.addEventListener('click', reset);

$(function() {
  chrome.storage.sync.get("product_list", function (items) {
    console.log('아이템', items)
    var message = document.querySelector('.message');
    if (items.product_list) {
      var product_list = items.product_list;
      console.log('프로덕트 리스트', product_list);


      var product_list_DOM = $('<div />').addClass('row');
      product_list.map(function(d) {
        var $product_col = $('<a />').attr('href', d.url).attr('target', '_blank').addClass('product col s6 m4 l3');
        var $product_info = $('<div />').addClass('p-info');
        $product_col.append("<img src=" + d.img + " class='img-responsive'>");
        $product_info.append("<div class='p-title'>" + d.title + "</div>");
        $product_info.append("<p class='p-shop'>" + d.shop + "</p><p class='p-price'>" + d.price + "₩</p>");
        $product_col.append($product_info);
        product_list_DOM.prepend($product_col);
      })
      $('.product_list').append(product_list_DOM);

    } else {
      message.innerText = "비었습니다";
    }
  });
});



function saveChanges() {
  // Get the current CSS snippet from the form.
  var cssCode = textarea.value;
  // Check that there's some code there.
  if (!cssCode) {
    message('Error: No CSS specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  storage.set({'css': cssCode}, function() {
    // Notify that we saved.
    message('Settings saved');
  });
}

function loadChanges() {
  storage.get('css', function(items) {
    // To avoid checking items.css we could specify storage.get({css: ''}) to
    // return a default value of '' if there is no css value yet.
    if (items.css) {
      textarea.value = items.css;
      message('Loaded saved CSS.');
    }
  });
}

function reset() {
  // Remove the saved value from storage. storage.clear would achieve the same
  // thing.
  storage.remove('css', function(items) {
    message('Reset stored CSS');
  });
  // Refresh the text area.
  textarea.value = '';
}

function message(msg) {
  // var message = document.querySelector('.message');
  // message.innerText = msg;
  // setTimeout(function() {
  //   message.innerText = '';
  // }, 3000);
  alert("후에에엥")
  storage.get('product_list', function(items) {
    var message = document.querySelector('.message');
    if (items.product_list) {
      console.log('프로덕트 리스트', items.product_list)
      // message('Loaded saved CSS.');
    } else {
      message.innerText = "비었습니다";
    }
  });

  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
