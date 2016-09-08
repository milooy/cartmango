// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
// {
//     if(request.action == "getTabId") {
//         chrome.tabs.getSelected(null, function(tabs) {
//             chrome.tabs.sendRequest(tabs.id, { action: "response" });
//         });
//     }
// });


//chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//  // Use the token.
//  console.log(token);
//});



// var oauth = ChromeExOAuth.initBackgroundPage({
//   'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
//   'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
//   'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
//   'consumer_key' : 'anonymous',
//   'consumer_secret' : 'anonymous',
//   'scope' : 'http://www.google.com/m8/feeds/',
//   'app_name' : 'Sample - OAuth Contacts'
// });
