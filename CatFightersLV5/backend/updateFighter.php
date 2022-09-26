<?php
    /*      Script which is called to update fighter.
            In app.js we made POST request and send
            winner ID and loser ID.
    */

    include './database/dbHandler.php';
    use database\dbHandler;
   

    $winnerID = $_POST["winnerID"];
    $loserID = $_POST["loserID"];

    $dbHandler = new dbHandler();
    $dbHandler->connect();

    /*  In this section we are calling two methods from our database handler
        First is to get user by ID.
        Second is for updating selected user.
    */
    $fetchResult = $dbHandler->getFighterById($loserID);
    $oldValue = $fetchResult->fetch_assoc()['catLoss'];
    $newValue = $oldValue+1;
    $dbHandler->upateFighterInfo($loserID,"catLoss",$newValue);

    $fetchResult = $dbHandler->getFighterById($winnerID);
    $oldValue = $fetchResult->fetch_assoc()['catWins'];
    $newValue = $oldValue+1;
    $dbHandler->upateFighterInfo($winnerID,"catWins",$newValue);

    $dbHandler->disconnect();
  
?>