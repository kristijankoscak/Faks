
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
    <div class="row w-100">
        <div class="col-10">
            <span class="ml-5 h1">CFC 3 - UPDATE FIGHTER</span> 
        </div>
        <div class="col-2">
            <a class="float-right mr-5" href="../index.php">Go Back -></a>
        </div>
       
    </div>
    <div class="row container-flex">
        <div class="container float-left ml-5 mt-5">
            <?php
                include '../backend/database/dbHandler.php';
                use database\dbHandler;
                $dbHandler = new dbHandler();
                $dbHandler->connect();
                $updateID = $_GET['updateID'];
                $result = $dbHandler->getFighterById($updateID);
                $fighter = $result->fetch_assoc();
                $formUpdateAction = "../backend/editFighter.php?updateID=$updateID";
                $formDeleteAction = "../backend/deleteFighter.php?updateID=$updateID";
                $dbHandler->disconnect();
            ?>
            <form action=<?php echo $formUpdateAction; ?> method="POST" enctype="multipart/form-data">
                
                <div class="form-group row w-25">
                    <label for="inputName" class="col-sm-2 col-form-label col-form-label-sm">Name</label>
                    <div class="col-sm-10">                                                          
                        <input type="text" class="form-control form-control-sm " name="einputName" id="editName" <?php  echo "value="."\"".$fighter['catName']."\"";?> required>
                    </div>
                </div>
                <div class="form-group row w-25">
                    <label for="inputAge" class="col-sm-2 col-form-label col-form-label-sm">Age</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control form-control-sm" name="einputAge" <?php echo "value=".$fighter['catAge']; ?> required>
                    </div>
                </div>
                <div class="form-group row w-25">
                    <label for="inputInfo" class="col-sm-2 col-form-label col-form-label-sm">Info</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control form-control-sm" name="einputInfo" <?php  echo "value="."\"".$fighter['catInfo']."\"";?> required>
                    </div>
                </div>
                <div class="form-group row w-25">
                    <label for="inputWins" class="col-sm-2 col-form-label col-form-label-sm">Wins</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control form-control-sm" name="einputWins" <?php echo "value=".$fighter['catWins']; ?> required>
                    </div>
                    <label for="inputLoss" class="col-sm-2 col-form-label col-form-label-sm">Loss</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control form-control-sm" name="einputLoss" <?php echo "value=".$fighter['catLoss']; ?> required>
                    </div>
                </div>
                <div class="form-group row w-25">
                    <label for="inputCatImage" class="col-sm-2 col-form-label col-form-label-sm">Cat Image</label>
                    <div class="col-sm-10">
                        <button type="button" class="btn btn-secondary w-100 btn-sm" onclick="changeImage()">Add new Cat Image</button>
                        <span id="echosenFile" name="echosenFile" ><?php echo $fighter['catImage']; ?></span>
                        <input type="file" class="form-control-file" id="einputCatImage" name="einputCatImage" hidden>
                    </div>
                </div>
                <div class="d-flex justify-content-center w-25">
                    <button type="submit" class="btn btn-primary mb-2 w-75">UPDATE</button>
                </div>
            </form>
        </div>
    </div>
    <div class="row container-flex">
        <div class="col-12">
            <form action=<?php echo $formDeleteAction; ?> method="POST">
                <button type="submit" class="btn btn-danger mr-2 float-right">DELETE FIGHTER</button>
            </form>
        </div>
    </div>
    <script src="../src/editFighter.js"></script>
</body>
</html>
