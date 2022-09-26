
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

    <link rel="stylesheet" href="./src/style.css"/>

</head>
<body>
    <section class="container d-flex flex-column  align-items-center mb-4">
        <h1>CFC 3</h1>
        <h2>Choose your cat</h2>
    </section>
    <div class="container d-flex flex-column  align-items-center">
        <div id="clock" class="clock display-4"></div>
        <div id="message" class="message"></div>
    </div>
    <div class="row">
        <div id="firstSide" class="container d-flex flex-column  align-items-center side first-side col-5">
            <div class="row d-flex justify-content-end">
                <div class="col-auto">
                    <ul class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins:<span class="wins"></span> Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto featured-cat-fighter">
                    <img class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div class="row fighter-list">
                        <?php
                            include 'backend/database/dbHandler.php';
                            use database\dbHandler;

                            $dbHandler = new dbHandler();
                            $dbHandler->connect();
                            $result = $dbHandler->getFighters();

                            error_reporting(E_ERROR | E_PARSE);
                            if ($result->num_rows > 0) {
                                // output data of each row
                                while($row = $result->fetch_assoc()) {
                                    $fighter = new stdClass();
                                    $fighter->id = $row["catID"];
                                    $fighter->name = $row["catName"];
                                    $fighter->age = $row["catAge"];
                                    $fighter->catInfo = $row["catInfo"];
                                    $fighter->record->wins = $row['catWins'];
                                    $fighter->record->loss = $row['catLoss']; 
                                    echo '
                                        <div class="col-md-4 mb-1">
                                            <div class="fighter-box"
                                            data-info = \''.json_encode($fighter).'\' >
                                                <img src='.$row["catImage"].' alt="Figter Box 1" width="150" height="150">
                                            </div>
                                            <a href="pages/editFighterPage.php?updateID='.$row["catID"].'" id="edit" class="btn btn-secondary mb-4 mt-1">Edit</a>
                                        </div>';  
                                }
                            }
                            else {
                                echo "\t 0 results";
                            }
                            
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2 d-flex flex-column align-items-center">
            <p class="display-4">VS</p>
            <button id="generateFight" class="btn btn-primary mb-4 btn-lg">Fight</button>
            <button id="randomFight" class="btn btn-secondary mb-4 ">Select Random fighters</button>
            <a id="newFighter" class="btn btn-info" href="pages/addFighterPage.php">Create new fighter</a>
        </div>
        <div id="secondSide" class="container d-flex flex-column align-items-center side second-side col-5">
            <div class="row">
                <div class="col-auto featured-cat-fighter">
                    <img class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto">
                    <ul class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins: <span class="wins"></span>Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div class="row fighter-list">
                        <?php
                            error_reporting(E_ERROR | E_PARSE);
                            $result = $dbHandler->getFighters();
                            if ($result->num_rows > 0) {
                                // output data of each row
                                while($row = $result->fetch_assoc()) {
                                    $fighter = new stdClass();
                                    $fighter->id = $row["catID"];
                                    $fighter->name = $row["catName"];
                                    $fighter->age = $row["catAge"];
                                    $fighter->catInfo = $row["catInfo"];
                                    $fighter->record->wins = $row['catWins'];
                                    $fighter->record->loss = $row['catLoss']; 
                                    echo '
                                        <div class="col-md-4 mb-1">
                                            <div class="fighter-box"
                                            data-info = \''.json_encode($fighter).'\' >
                                                <img src='.$row["catImage"].' alt="Figter Box 1" width="150" height="150">
                                            </div>
                                            <a href="pages/editFighterPage.php?updateID='.$row["catID"].'" id="edit" class="btn btn-secondary mb-4 mt-1">Edit</a>
                                        </div>';  
                                }
                            }
                            else {
                                echo "\t 0 results";
                            }
                            $dbHandler->disconnect();
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="./src/app.js"></script>
    <script src="./src/editFighter.js"></script>
</body>
</html>
