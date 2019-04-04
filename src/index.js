import { app, BrowserWindow } from 'electron'
const { desktopCapturer } = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;



function handleStream (stream) {
  let oVideo = document.createElement('video')
  oVideo.style="position:fixed;width:300px;height:300px;left:0px;top:0px;z-index:9999"
  document.body.appendChild(oVideo)
  oVideo.srcObject = stream
  oVideo.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}





const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 768,
	frame: false,
	nodeIntegration: false,
	webPreferences: {
	  webSecurity: false
	}
  });
  

  // and load the index.html of the app.
  // mainWindow.loadURL('https://webrtn.double-teacher-test.cs.dreamdev.cn/#/foreign/login');
  mainWindow.loadFile('./index.html');
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
 
 // const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
console.log(desktopCapturer)
//   desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
//     if (error) throw error
//     for (let i = 0; i < sources.length; ++i) {
//       if (sources[i].name === 'Electron') {
//         navigator.mediaDevices.getUserMedia({
//           audio: false,
//           video: {
//             mandatory: {
//               chromeMediaSource: 'desktop',
//               chromeMediaSourceId: sources[i].id,
//               minWidth: 1280,
//               maxWidth: 1280,
//               minHeight: 720,
//               maxHeight: 720
//             }
//           }
//         }).then((stream) => handleStream(stream))
//           .catch((e) => handleError(e))
//         return
//       }
//     }
//   })

  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
