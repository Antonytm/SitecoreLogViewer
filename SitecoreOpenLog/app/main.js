window.onload = function () {
    var plugin = document.getElementById("plugin");//.createElement("embed");
    plugin.setAttribute("type", "application/x-npapi-file-io");
    plugin.setAttribute("style", "width:0px; height: 0px;");
    document.documentElement.appendChild(plugin);
    console.log(plugin.getPlatform());
    console.log(plugin.listFiles("C:\\inetpub\\wwwroot\\"));
    
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var parser = document.createElement('a');
        parser.href = tabs[0].url;
        console.log(parser.host);
        var a = plugin.lastFileByTemplate("C:\\inetpub\\wwwroot\\" + parser.host + "\\Data\\logs\\", "log*.txt");
        console.log(a);
        logFilePath = "C:\\inetpub\\wwwroot\\" + parser.host + "\\Data\\logs\\" + a[0].name;
        console.log(logFilePath);
        fileContent = plugin.getTextFile(logFilePath);
        window.document.getElementById("log").innerHTML = fileContent.replace("\n\r","<br/>");
    });
}