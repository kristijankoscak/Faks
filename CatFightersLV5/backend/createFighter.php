<?php

    include './imageUploadHandler.php';
    use imageHandler\imageUploadHandler;
    include './database/dbHandler.php';
    use database\dbHandler;

    $imageHandler = new imageUploadHandler();
    $imageHandler->inputInit();
    $imageHandler -> checkFile();
    $imageHandler -> saveFile();
   

    $dbHandler = new dbHandler();
    $dbHandler->connect();

    // fetching entered text from inputs
    $name =  $_POST["inputName"]; 
    $age =  $_POST["inputAge"];
    $info = $_POST["inputInfo"];
    $wins =$_POST["inputWins"];
    $loss = $_POST["inputLoss"];
    $path = $imageHandler->getFilePath();

    $dbHandler->addFighter($name,$age,$info,$wins,$loss,$path);

    $dbHandler->getFighters();

    $dbHandler->disconnect();
    header('Location: ../index.php');
?>