window.onload = function () {
    var plugin = document.getElementById("plugin");//.createElement("embed");
    plugin.setAttribute("type", "application/x-npapi-file-io");
    plugin.setAttribute("style", "width:0px; height: 0px;");
    document.documentElement.appendChild(plugin);
    console.log(plugin.getPlatform());
    chrome.storage.sync.get({
        wwwrootFolder: 'c:\\inetpub\\wwwroot\\'
    }, function (items) {
        var wwwrootFolder = items.wwwrootFolder;
        console.log(wwwrootFolder);
        showPopup(wwwrootFolder);
    });
}

function showPopup(wwwrootFolder) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var start = (new Date()).getTime();
        var parser = document.createElement('a');
        parser.href = tabs[0].url;
        console.log(parser.host);
        var a = plugin.lastFileByTemplate(wwwrootFolder + parser.host + "\\Data\\logs\\", "log*.txt");
        var getFile = (new Date()).getTime();
        console.log(getFile - start);
        console.log(a);
        logFilePath = wwwrootFolder + parser.host + "\\Data\\logs\\" + a[0].name;
        console.log(logFilePath);
        fileContent = plugin.getTextFile(logFilePath);
        var fileRead = (new Date()).getTime();
        console.log(fileRead - getFile);
        window.document.getElementById("log").innerHTML = fileContent.replace(/(?:\r\n|\r|\n)/g, '<br />') + "<div id='bottom'></div>";
        console.log(fileContent);
        var popupShown = (new Date()).getTime();
        console.log(popupShown - fileRead);
        document.getElementById('bottom').scrollIntoView();
        window.setTimeout(function () { top(); }, 2000);
    });
}