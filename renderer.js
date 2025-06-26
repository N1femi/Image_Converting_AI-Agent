// Use require for everything in Electron renderer
const { exec } = require("child_process")
const { ipcRenderer } = require("electron")
const { path } = require("path")


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

        if (result != null && result.canceled === false) {
            console.log("Selected an Image")
            
            // If canceled is false then we got a file path >:)
            filePath = result.filePaths[0]
            imgPreview.src = filePath
        }
        
    } catch (error) {
        console.error("IPC Error:", error)
    }
}


    

const outFormatEl = document.getElementById("format-dropdown")
const convertBtn = document.querySelector("#convert-button")

function convert() {
    // Check if user selected a file first
    if (!filePath) {
        alert("Please select a file first!")
        return  // Exit the function early if no file
    }

    // Get the output format from the dropdown menu
    const outputFormat = outFormatEl.value
    // Get the current file's extension (pdf, jpg, etc.)
    const currentFormat = filePath.split(".").pop()
    
    // Don't convert if file is already in the right format
    if (outputFormat === currentFormat) {
        alert("File is already in the desired format!")
        return 
    }

    // Update the button to show conversion is happening
    convertBtn.textContent = "Converting..."
    convertBtn.disabled = true

    // Build the full path to your Python script
    // __dirname = current folder where this JS file is located
    // path.join() safely combines folder paths
    const pythonScriptPath = path.join(__dirname, 'python', 'ic_agent_core.py')
    
    // Create the command that will run in the terminal
    // It's like typing: python "path/to/script.py" "input/file.jpg" "pdf"
    const command = `python "${pythonScriptPath}" "${filePath}" "${outputFormat}"`
    
    // Actually run the command
    exec(command, function(error, stdout, stderr) {
        // This function runs AFTER the Python script finishes
        
        // Reset the button back to normal
        convertBtn.textContent = 'Convert'
        convertBtn.disabled = false
        
        // Check if something went wrong
        if (error) {
            console.error('Error running Python script:', error)
            alert('Conversion failed! Check console for details.')
            return  // Stop here if there was an error
        }

        // stderr = error messages from Python (but not fatal errors)
        if (stderr) {
            console.error('Python warnings:', stderr)
            // Still show warnings but don't stop the process
        }

        // stdout = normal output from Python (like print statements)
        console.log('Python script output:', stdout)
        alert('Conversion completed successfully!')
    })
}