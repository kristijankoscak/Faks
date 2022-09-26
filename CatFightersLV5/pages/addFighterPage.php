
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadatak 1</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

</head>
<body>
    <div class="container-flex">
        <span class="ml-5 h1">CFC 3 - ADD NEW FIGHTER</span> 
        <a class="float-right mr-5" href="../index.php">Go Back -></a>
    </div>
    <div class="container w-25 float-left ml-5 mt-5">
        <form action="../backend/createFighter.php" method="POST" enctype="multipart/form-data">
            <div class="form-group row">
                <label for="inputName" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm" name="inputName" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputAge" class="col-sm-2 col-form-label col-form-label-sm">Age</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm" name="inputAge" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputInfo" class="col-sm-2 col-form-label col-form-label-sm">Info</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-sm" name="inputInfo" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputWins" class="col-sm-2 col-form-label col-form-label-sm">Wins</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control form-control-sm" name="inputWins" required>
                </div>
                <label for="inputLoss" class="col-sm-2 col-form-label col-form-label-sm">Loss</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control form-control-sm" name="inputLoss" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="inputCatImage" class="col-sm-2 col-form-label col-form-label-sm">Cat Image</label>
                <div class="col-sm-10">
                    <button type="button" class="btn btn-secondary w-100 btn-sm" onclick="addImage()">Add new Cat Image</button>
                    <span id="chosenFile" ></span>
                    <input type="file" class="form-control-file" id="inputCatImage" name="inputCatImage" hidden required>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mb-2 w-75">SUBMIT</button>
            </div>
        </form>
    </div>
    <script src="../src/addNewFighter.js"></script>
</body>
</html>
