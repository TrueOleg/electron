const { ipcRenderer } = require('electron')
const window = require('electron').remote.getCurrentWindow()


showName = document.getElementById('showName')
ipcRenderer.on('forWin2', function (event, arg){
    console.log(arg);
    const send = arg ? 'I ignore mouse events' : 'I handle mouse events';
    showName.innerHTML = send;

    window.setIgnoreMouseEvents(arg);

});
console.log("I'm Window2");
