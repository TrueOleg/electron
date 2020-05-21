const { ipcRenderer } = require('electron')
const window = require('electron').remote.getCurrentWindow()
let tr = false;

showName = document.getElementById('showName')
ipcRenderer.on('forWin2', function (event, arg){
    console.log(arg);
    showName.innerHTML = arg;
    tr = !tr;
    window.setIgnoreMouseEvents(tr);

});
console.log("I'm Window2");
