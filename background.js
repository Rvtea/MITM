'use strict';

// TODO: re should be configurable and need communicate with popup dialog
var re = /input_your_regexp_here/i;

// Initialize
var extensionEnable = true;
chrome.storage.local.set({"extensionEnable": extensionEnable}, function() {
    console.log('Save successfully and Set the initial value!');
});

// Use storage at local to avoid info sync with popup.js directly
function checkStorage() {
    chrome.storage.onChanged.addListener(function(changes, areaname) {
        console.log("[WARN] Now we have extension enable value as: " + changes["extensionEnable"].newValue);
        extensionEnable = changes["extensionEnable"].newValue;
    });
}
setInterval(checkStorage, 500);

// Actual process
chrome.webRequest.onBeforeRequest.addListener(
    function(resource) {
        if( extensionEnable && re.test(resource.url) ){
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

            // upper than chrome 58 use chrome.runtime.getURL, otherwise chrome.extension.getURL
            // NEED COMPATIBILITY
            return {redirectUrl: chrome.extension.getURL("replace.js")};
        }
    },
    {urls: ["*://*/*.js"]}, // TODO: should be configurable
    ["blocking"]
);