// Probably make sure file is valid for the type of Converion(Images)
const { spawn } = require("child_process")
const { dialog } = require("@electron/remote")

let acceptedFormats = ["jpg", "jpeg", "png", "webm", "bmp"]

// Previewing Image Handler
let fileInputEl = document.getElementById("file-input")
let imgPreview = document.getElementById("preview")

fileInputEl.addEventListener("change", function(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
        console.log("Selected File, Found!")
        const tempUrl = URL.createObjectURL(selectedFile)

        imgPreview.src = tempUrl

    } else {
        console.log("Cannot find selected file.")
    }
    
})

function browse() {
    const result = dialog.showOpenDialog({
        filters: [
            {name: "Images", extensions: ["jpg", "jpeg", "png", "webm", "bmp"]}
        ]
    })
}

let outFormatEl = document.getElementById("format-dropdown")
let filePath = null

function convert() {
    const outFormat = outFormatEl.value


}





// When user chooses file display image in preview
// Once user clicks convert, take them to the converter page
// User can cancel conversion process anytime