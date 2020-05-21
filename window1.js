const ipcRenderer = require('electron').ipcRenderer


let tr = true;
ButtonSendName = document.getElementById('sendName');
ButtonSendName.addEventListener('click', (event) => {
    tr = !tr;
    ipcRenderer.send('nameMsg', tr);
})

ipcRenderer.on('nameReply', (event, arg) => {
    console.log(arg) // why/what is not right..
});
