"use strict";

var enableStatus;

$(document).ready(function() {
    const $saveBtn = $('#saveBtn');
    const $fileInput = $('#replaceFilePath');
    const $urlRegInput = $('#urlReg');
    const $fileNameLink = $('#fileName');
    const $resetBtn = $('#resetBtn');

    $urlRegInput.val(localStorage['url_regexp']);
    $fileNameLink.html(localStorage['local_js_file_name']);
    $fileNameLink.attr('href', localStorage.js_content);
    $fileNameLink.on('click', e => {
        e.preventDefault();
        chrome.tabs.create({url: localStorage.js_content, active: true});
    });

    const reloadPage = () => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.reload(tabs[0].id, {
          bypassCache: true // skip cache is needed here
        });
        window.close();
      });
    };

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

    $saveBtn.on('click', () => {
        const file = $fileInput[0].files[0];
        let fileName = file ? file.name : '';
        localStorage.local_js_file_name = fileName;

        const regexp = $urlRegInput.val();
        localStorage.url_regexp = regexp;

        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            const fileContent = e.target.result;
            localStorage.js_content = fileContent;
            reloadPage();
          };
          reader.readAsDataURL(file);
        } else {
          reloadPage();
        }
    });

    $resetBtn.on('click', () => {
      localStorage.clear();
      $urlRegInput.val('');
      $fileNameLink.html('');
      $fileNameLink.attr('href', '#nogo');
      reloadPage();
    });
});