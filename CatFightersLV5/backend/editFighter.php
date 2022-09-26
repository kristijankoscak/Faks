<?php
    include './imageUploadHandler.php';
    use imageHandler\imageUploadHandler;
    include './database/dbHandler.php';
    use database\dbHandler;
   

    $dbHandler = new dbHandler();
    $dbHandler->connect();
    $imageHandler = new imageUploadHandler();
    $imageHandler->inputInit();


    /*
        we are fetching inputs
        if there is change on image input, we delete old one
        and add new one
    */
    $id = $_GET["updateID"];
    $name =  $_POST["einputName"]; 
    $age =  $_POST["einputAge"];
    $info = $_POST["einputInfo"];
    $wins =$_POST["einputWins"];
    $loss = $_POST["einputLoss"];
    $result = $dbHandler->getOldPath($id);
    $path = $result->fetch_assoc()['catImage'];
    echo $path;
    if($_FILES["einputCatImage"]["name"] != ""){
        $imageHandler -> deleteFile($path);
        $imageHandler -> checkFile();
        $imageHandler -> saveFile();
        $path = $imageHandler->getFilePath();
    };
    $dbHandler->updateFighterById($id,$name,$age,$info,$wins,$loss,$path);

    $dbHandler->disconnect();
    header('Location: ../index.php');

    ?>