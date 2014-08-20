'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url && tab.url.indexOf('https://free.gotomeeting.com/') === 0) {
    chrome.pageAction.show(tabId);
  }
});

console.log('\'Allo \'Allo! Event Page for Page Action');

chrome.storage.sync.get('yoUsername', function(data){
  console.log("GET:", data.yoUsername);

  // Send username to Heroku app
  if(data.yoUsername !== undefined){
    var req = new XMLHttpRequest();
    req.open("GET", 'http://yoshervinshaikh.herokuapp.com/?username=' + data.yoUsername + '&extension=yes', false);
    req.send(null);
    console.log(req.responseText);
  }
});