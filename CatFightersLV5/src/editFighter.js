function changeImage(){
    inputImage = document.querySelector("#einputCatImage")
    inputImage.click()
    onFilePick()
}

function onFilePick(){
    inputImage = document.querySelector("#einputCatImage")
    inputImage.addEventListener('change',(e) => {
        var path = document.querySelector("#einputCatImage").value
        var splittedPath = path.split("\\")
        var file = splittedPath.pop()
        console.log(file)
        document.querySelector("#echosenFile").textContent =""
        document.querySelector("#echosenFile").textContent =file
    });
}

