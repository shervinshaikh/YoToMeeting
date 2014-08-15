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
