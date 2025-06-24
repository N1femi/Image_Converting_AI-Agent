const { app, BrowserWindow, dialog, ipcMain } = require('electron')


function handleShowOpenDialog() {
    // console.log('IPC handler called!') // Debug line
    
    return dialog.showOpenDialog({
        filters: [
            {name: "Images", extensions: ["jpg", "jpeg", "png", "webp", "bmp"]}
        ]
    }).then(function(result) {
        // console.log('Dialog result in main:', result) // Debug line
        return result
    })
}

ipcMain.handle('show-open-dialog', handleShowOpenDialog)


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
     contextIsolation: false,
     // sandbox: true
   }
 })

  // Min Window Size = [750, 500]
  // Max Window Size = [1088, 725]

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

