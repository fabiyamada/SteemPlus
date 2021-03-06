chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("bgs: forwarded " + request.data + " to the tab " + request.to);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request, function(response) {      });
    });
});

chrome.commands.onCommand.addListener(function(command) {
    console.log(command);
    if (command === 'busyfy') {

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            if (url.includes('steemit.com')) {
                chrome.tabs.getSelected(null, function (tab) {
                    var code = url.replace('steemit.com', 'busy.org');
                    chrome.tabs.update(tab.id, {url: code});
                });
            }
            else if (url.includes('busy.org')) {

                chrome.tabs.getSelected(null, function (tab) {
                    var code = url.replace('busy.org', 'steemit.com');
                    chrome.tabs.update(tab.id, {url: code});
                });
            }
        });

    }
    else if (command === 'steemdify') {

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            if (url.includes('steemit.com')) {
                chrome.tabs.getSelected(null, function (tab) {
                    var code = url.replace('steemit.com', 'steemd.com');
                    chrome.tabs.update(tab.id, {url: code});
                });
            }
            else if (url.includes('steemd.com')) {

                chrome.tabs.getSelected(null, function (tab) {
                    var code = url.replace('steemd.com', 'steemit.com');
                    chrome.tabs.update(tab.id, {url: code});
                });
            }
        });

    }
});
