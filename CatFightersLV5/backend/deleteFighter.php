<?php
    include './imageUploadHandler.php';
    use imageHandler\imageUploadHandler;
    include './database/dbHandler.php';
    use database\dbHandler;
   

    $dbHandler = new dbHandler();
    $dbHandler->connect();
    $imageHandler = new imageUploadHandler();

    /*  when we click on edit button on some fighter,
        we are sending it's ID through GET request
    */
    $id = $_GET['updateID'];
    $result = $dbHandler->getOldPath($id);
    $path = $result->fetch_assoc()['catImage'];
    $imageHandler -> deleteFile($path);
    $dbHandler->deleteFighterById($id);
    
    $dbHandler->disconnect();
    header('Location: ../index.php');

    ?>