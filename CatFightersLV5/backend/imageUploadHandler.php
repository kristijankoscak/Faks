<?php
    namespace imageHandler;
    class imageUploadHandler{
        private $file ;
        private $targetDirectory ;
        private $directorySize ;
        private $targetFile ;
        private $uploadStatus ;
        private $savedFilePath;

        public function __construct(){
            $this->targetDirectory = "../catImages/";
            $this->uploadStatus = 1;
        }
        public function inputInit(){
            $this->file = $this->choseInput("name");
            $this->targetFile = basename($this->targetDirectory) . $this->file;
        }

        // main check function
        public function checkFile(){
            $this->checkFileType();
            $this->checkExtension();
        }

        // checking if file is an image
        private function checkFileType(){
            if(isset($_POST["submit"])) {
                $check = getimagesize($this->choseInput("tmp_name"));
                if($check !== false) {
                    $this->uploadStatus = 1;
                } 
                else {
                    $this->uploadStatus = 0;
                }
            } 
        }
        // checking if file extension is ok
        private function checkExtension(){
            $imageFileType = strtolower(pathinfo($this->targetFile,PATHINFO_EXTENSION));
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
                $this->uploadStatus = 0;
            }
        }
        public function saveFile(){
            $this->directorySize = $this->getLastNumber();
            echo $this->directorySize;
            if($this->uploadStatus == 1){
                $temp = explode(".", $this->file);
                $extension = end($temp);
                $catName = "cat".($this->directorySize+1).".".$extension;
                if (move_uploaded_file($this->choseInput("tmp_name"), $this->targetDirectory . $catName)) {
                    //echo "The file ". $catName . " has been uploaded.";
                } 
                else {
                    //echo "Sorry, there was an error uploading your file.";
                }
                $this->savedFilePath = "./catImages/" . $catName;
            }
        }
        private function choseInput($type){
            $temp = "";
            if($_FILES["inputCatImage"][$type] != ""){
                $temp = $_FILES["inputCatImage"][$type];
            }
            if($_FILES["einputCatImage"][$type] != ""){
                $temp = $_FILES["einputCatImage"][$type];
            }
            return $temp;
        }
        
        /*  function for getting number from last cat in catImage directory
            used for saving new ones.. example: if there is cat1,cat2,cat3
            next one will be cat4 
        */
        private function getLastNumber(){
            $lastID = 0;
            $files = glob($this->targetDirectory . "*");
            foreach($files as $file){
                $lastID = filter_var($file, FILTER_SANITIZE_NUMBER_INT);
            }
            return $lastID;
        }
        public function deleteFile($fileForDelete){
            $oldFile = ".".$fileForDelete;
            $files = glob($this->targetDirectory . "*");
            foreach($files as $file){
                if($file == $oldFile){
                    unlink($file);
                }
                
            }
        }
        public function getFilePath(){
            return $this->savedFilePath;
        }
    }
?>