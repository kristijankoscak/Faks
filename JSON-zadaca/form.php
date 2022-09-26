<?php		
    function dbConnect(){
       $conn = new mysqli("localhost", "root", "","polet");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        else { return $conn;}
    }
    $obj = json_decode($_POST["strObj"]);
    $conn = dbConnect();
    $sql = (" SELECT * FROM routes WHERE startPoint='".$obj->start."' AND endPoint='".$obj->end."' AND date='".$obj->date."' AND freeSpace-".$obj->peoples." >=0");
    $result = $conn->query($sql);
    $routes = array();
    $routesarray = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            /* if( ($row["freeSpace"]-$obj->peoples) >= 0) {
                array_push($routesarray, $row); 
            }  */
            array_push($routesarray, $row); 
             
        }
        $routes["allroutes"] = $routesarray;  
        echo json_encode($routes);
    }
?>