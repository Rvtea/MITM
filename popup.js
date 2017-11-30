"use strict";

var enableStatus;

$(document).ready(function() {
    // use null to get all the k-v pairs
    chrome.storage.local.get(null, function(item) {
        console.log("Now we have initial value as: " + item["extensionEnable"]);
        $("#extensionSwitch").prop('checked', item["extensionEnable"]);
    });

    // add onclick event
    $("#extensionSwitch").on("click", function(e) {
        enableStatus = e.target.checked;

        // as change extension status need Hard Reload page, automatically do this for user
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id, {
                bypassCache: true // skip cache is needed here
            });
          });
        console.log(`The extension is ${enableStatus ? "enabled" : "disabled"}!`);
        // localStorage has view in devTools while chrome.storage not...
        // so you have to use console.log to print the value in chrome.storage
        chrome.storage.local.set({"extensionEnable": enableStatus}, function() {
            console.log('Save successfully!');
        });
    });
});