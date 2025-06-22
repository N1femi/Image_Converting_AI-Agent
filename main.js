const { app, BrowserWindow } = require('electron')

const createWindow = () => {
 const win = new BrowserWindow({
   width: 750,
   height: 500,
   minWidth: 750,
   minHeight: 500,
   maxWidth: 1088,
   maxHeight: 725,

   webPreferences: {
     nodeIntegration: true,
     contextIsolation: false
   }
 })

  // Min Window Size = [750, 500]
  // Max Window Size = [1088, 725]

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

