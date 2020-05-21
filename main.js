// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

// function createWindow () {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     transparent: true,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })
//
//   mainWindow.maximize();
//   mainWindow.setIgnoreMouseEvents(true);
//   mainWindow.setFocusable(true);
//   mainWindow.setAlwaysOnTop(true, "floating");
//   mainWindow.setVisibleOnAllWorkspaces(true);
//   mainWindow.setFullScreenable(false);
//   // and load the index.html of the app.
//   mainWindow.loadFile('index.html');
//   // mainWindow.webContents.openDevTools()
//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
//   const smallWindow = new BrowserWindow({
//     width: 200,
//     height: 200,
//     backgroundColor: 'blue',
//     // transparent: true,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })
// }
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()
//
//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//
//     const x = BrowserWindow.getAllWindows()
//
//     console.log('fffgfgfg', x)
//     console.log('dddddddd',)
//   })
// })
//
// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') app.quit()
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
let window1, window2;

function createWindow1 () {
  window1 = new BrowserWindow({width: 800,height: 600, webPreferences: {
      nodeIntegration: true
    }})
  window1.loadFile(`./window1.html`)
  window1.webContents.openDevTools()
  window1.on('closed', function () {
    window1 = null
  })
  return window1
}
function createWindow2 () {
  window2 = new BrowserWindow({width: 1000, height: 600, webPreferences: {
      nodeIntegration: true
    }})
  window2.loadFile(`./window2.html`)
  window2.webContents.openDevTools()
  window2.on('closed', function () {
    window2 = null
  })
  return window2
}

app.on('ready', () => {
  window1 = createWindow1();
  window2 = createWindow2();

  ipcMain.on('nameMsg', (event, arg) => {
    console.log("name inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send('nameReply', {not_right: false}) // sends back/replies to window 1 - "event" is a reference to this chanel.
    window2.webContents.send('forWin2', arg); // sends the stuff from Window1 to Window2.
  });
})
