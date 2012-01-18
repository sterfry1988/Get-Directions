// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// A generic onclick callback function.


function genericOnClick(info, tab) {
    console.log("mouse clicked");
    chrome.extension.sendRequest({
        method: "getLocalStorage",
        key: "saddr"
    }, function (response) {
        console.log("request made");
        var sText = info.selectionText;
        var daddr = sText.split(' ').join('+');
        var saddr = response.data;
        var homeTxt = "http://maps.google.com/maps?" + "saddr=" 
        + saddr.split(' ').join('+') + "&daddr=";
        var url = homeTxt + daddr;
        chrome.tabs.create({
            url: url
        });
        console.log("item " + info.menuItemId + " was clicked");
        console.log("info: " + JSON.stringify(info));
        console.log("tab: " + JSON.stringify(tab));
    });
}

// Create one test item for each context type.
var contexts = ["selection"];

for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Get Directions";
    var id = chrome.contextMenus.create({
        "title": title,
        "contexts": [context],
        "onclick": genericOnClick
    });
    chrome.contextMenus.remove(1);
    console.log("'" + context + "' item:" + id);
    console.log("what is this" + contexts[1] + contexts[0] + contexts[2]);
}

;
