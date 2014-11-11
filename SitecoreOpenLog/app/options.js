// Saves options to chrome.storage
function save_options() {
    var wwwrootFolder = document.getElementById('wwwrootFolder').value;
    chrome.storage.sync.set({
        wwwrootFolder: wwwrootFolder
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        wwwrootFolder: 'c:\\inetpub\\wwwroot\\'
    }, function (items) {
        document.getElementById('wwwrootFolder').value = items.wwwrootFolder;
        console.log(items.wwwrootFolder);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);