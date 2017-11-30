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
        // TODO: if status changed, should automatically trigger page reload event? Or make it configurable
        console.log(`The extension is ${enableStatus ? "enabled" : "disabled"}!`);
        // localStorage has view in devTools while chrome.storage not...
        // so you have to use console.log to print the value in chrome.storage
        chrome.storage.local.set({"extensionEnable": enableStatus}, function() {
            console.log('Save successfully!');
        });
    });
});