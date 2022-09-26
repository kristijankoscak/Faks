<?php
    namespace database;

    include 'dbConfig.php';
    include 'dbInterface.php';
    use database\dbInterface;
    use database\dbConfig as cfg;
    
    class dbHandler implements dbInterface{
        private $servername = "";
        private $username = "";
        private $password = "";
        private $database = "";
        private $connection = "";
        
        // in counstructor we setup our database information
        public function __construct(){
            $this->servername = cfg::servername;
            $this->username = cfg::user;
            $this->password = cfg::password;
            $this->database = cfg::database;
        }

        public function connect(){
            $this->createDB();
            $this->connection = new \mysqli($this->servername, $this->username, $this->password,$this->database);
            if ($this->connection->connect_error) {
                die("Connection failed: " .$this->connection->connect_error);
            }
            if ($this->connection->connect_error=="") {
                //do nothing.. error is "", so actually there is no error
            }
            else{
                echo "Connection error: " . $this->connection->error;
            }
            $this->createTable();
            
        }
        private function createDB(){
            $tempConnection = new \mysqli($this->servername, $this->username, $this->password);
            $db = cfg::database;
            $sql = "CREATE DATABASE IF NOT EXISTS $db";
            if ($tempConnection->query($sql) === TRUE) {
                //echo "Database created successfully";   // no need for writing this, you can uncomment this if you want to track operation
            }

            else{
                echo "Error creating database: " . $tempConnection->error;
            }  
            $tempConnection->close();  
        }
        private function createTable(){

            $sql = "CREATE TABLE IF NOT EXISTS fighters (
                catID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                catName VARCHAR(30) NOT NULL,
                catAge INT(5) NOT NULL,
                catInfo VARCHAR(150),
                catWins INT(5) NOT NULL,
                catLoss INT(5) NOT NULL,
                catImage VARCHAR(150)
            )";
            if ($this->connection->query($sql) === TRUE) {
                //echo "Table fighters created successfully"; // no need for writing this, you can uncomment this if you want to track operation
            } 
            else{
                echo "Error creating table: " . $this->connection->error;
            }
        }

        public function addFighter($name,$age,$info,$wins,$loss,$path){
            $sql = "INSERT INTO fighters (catName,catAge,catInfo,catWins,catLoss,catImage) 
                    VALUES('$name','$age','$info','$wins','$loss','$path')";
            if ($this->connection->query($sql) === TRUE) {
                //echo "New record created successfully";  // no need for writing this, you can uncomment this if you want to track operation
              } else {
                echo "Error: " . $sql . "<br>" . $this->connection->error;
              }
        }
        public function getFighters(){
            $sql = "SELECT * from fighters";
            $result = $this->connection->query($sql);
            return $result;
        }

        public function getFighterById($id){
            $sql = "SELECT * from fighters WHERE catID='$id'";
            $result = $this->connection->query($sql);
            return $result;
        }
        public function updateFighterById($id,$name,$age,$info,$wins,$loss,$path){
            $sql = "UPDATE fighters SET catName='$name',catAge='$age',
                    catInfo='$info',catWins='$wins',catLoss='$loss'
                    ,catImage='$path' WHERE catID='$id'";
            if ($this->connection->query($sql) === TRUE) {
                //echo "Record updated successfully"; // no need for writing this, you can uncomment this if you want to track operation
            } 
            else {
                echo "Error updating record: " . $this->connection->error;
            }
        }
        public function upateFighterInfo($id,$attrName,$newValue){
            $sql = "UPDATE fighters SET $attrName ='$newValue' WHERE catID='$id'";
            if ($this->connection->query($sql) === TRUE) {
                //echo "Record updated successfully"; // no need for writing this, you can uncomment this if you want to track operation
            } 
            else {
                echo "Error updating record: " . $this->connection->error;
            }
        }
        public function deleteFighterById($id){
            $sql = "DELETE FROM fighters WHERE catID='$id'";
            if ($this->connection->query($sql) === TRUE) {
                //echo "Record deleted successfully"; // no need for writing this, you can uncomment this if you want to track operation
            } 
            else {
                echo "Error deleting record: " . $this->connection->error;
            }
        }
        public function getOldPath($id){
            $sql = "SELECT catImage from fighters WHERE catID='$id'";
            $result = $this->connection->query($sql);
            return $result;
        }
        public function disconnect(){
            $this->connection->close();
        }
    }


?>