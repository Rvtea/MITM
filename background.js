'use strict';

// TODO: re should be configurable and need communicate with popup dialog
// var re = /input_your_regexp_here/i;
const getReFromStorage = () => {
    console.log('url_regexp', localStorage.url_regexp);
    let regStr = localStorage.url_regexp || '^this_should_never_be_matched_HJJKRTYUFVBKLMLFUYT$';
    return new RegExp(regStr, 'i');
};

const getReplaceFilePath = () => {
    console.log('js_content', localStorage.js_content);
    let content = localStorage.js_content || '';
    return content;
};

// Initialize
var extensionEnable = true;
chrome.storage.local.set({"extensionEnable": extensionEnable}, function() {
    console.log('Save successfully and Set the initial value!');
});

// Use storage at local to avoid info sync with popup.js directly
chrome.storage.onChanged.addListener(function(changes, areaname) {
    if (changes["extensionEnable"]) {
      console.log("[WARN] Now we have extension enable value as: " + changes["extensionEnable"].newValue);
      extensionEnable = changes["extensionEnable"].newValue;
      // clear cache to let user reload page with the latest resource from server instead of cache
      chrome.browsingData.removeCache({ 'since': 0 }, () => console.log("[WARN] Cache removed!"));
    }
});

console.log('regexp:', getReFromStorage());
console.log('replace url:', getReplaceFilePath());
// Actual process
chrome.webRequest.onBeforeRequest.addListener(
  function(resource) {

    if( extensionEnable && getReFromStorage().test(resource.url) ){
      console.log("*********************");
      console.log("Find the matched Reosource URL! And the URL is: " +  resource.url.slice(7));
      console.log("*********************");

      // TODO: Notification should be also configurable.
      chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Replace Successfully',
        message: 'Find the matched Resource and will be replaced now!'
      });

      return {redirectUrl: getReplaceFilePath()};
    }
  },
  {urls: ["*://*/*"]}, // TODO: should be configurable // NOTE by indooorsman: Hard code is ok here
  ["blocking"]
);

