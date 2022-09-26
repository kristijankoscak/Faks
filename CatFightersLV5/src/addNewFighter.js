function addImage(){
    inputImage = document.querySelector("#inputCatImage")
    inputImage.click()
    onFilePick()
}

function onFilePick(){
    inputImage = document.querySelector("#inputCatImage")
    inputImage.addEventListener('change',(e) => {
        var path = document.querySelector("#inputCatImage").value
        var splittedPath = path.split("\\")
        var file = splittedPath.pop()
        console.log(file)
        document.querySelector("#chosenFile").textContent =""
        document.querySelector("#chosenFile").textContent =file
    });
}

