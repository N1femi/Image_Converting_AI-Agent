// Use require for everything in Electron renderer
const { spawn } = require("child_process")
const { ipcRenderer } = require("electron")

let acceptedFormats = ["jpg", "jpeg", "png", "webm", "bmp"]

// Previewing Image Handler and Selectign
let imgPreview = document.getElementById("preview")
let result
let filePath

async function browse() {
    console.log("Browsing!")

    try {
        result = await ipcRenderer.invoke('show-open-dialog')
        console.log("Browse Result:", result)
        
    } catch (error) {
        console.error("IPC Error:", error)
    }
}

if (result != null && result.canceled === false) {
    console.log("Selected an Image")
    // If canceled is false then we got a file path >:)
    filePath = result.filePaths[0]
    imgPreview.src = filePath
}
    

let outFormatEl = document.getElementById("format-dropdown")

function convert() {
    const outFormat = outFormatEl.value
    
}