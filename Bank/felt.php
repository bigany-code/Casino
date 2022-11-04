<?php
function getdb()
{
    $servername = "localhost";
    $username = "borok";
    $password = "ASDqwe123";
    $db = "bank";
    try {
        $con = mysqli_connect($servername, $username, $password, $db);
        mysqli_query($con, "SET CHARACTER SET utf8");
        //echo "Connected successfully"; 
    } catch (exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    return $con;
}
//Tábla lekérdezés
function getTeljesTabla($tableName)
{
    $con = getdb();
    $resultset = mysqli_query($con, "SELECT * FROM `$tableName`");
    while ($row = mysqli_fetch_assoc($resultset)) {
        //print_r($row);
        //echo $row["email"]." ".$row["name"];
    }
}
getTeljesTabla("bankadat");

function osszegLeKerdez($kartyaszam)
{
    $rossz = "Rossz kartyaszam";

    $con = getdb();
    $resultset = mysqli_query($con, "SELECT osszeg, uname from bankadat WHERE kartyaszam='" . $kartyaszam . "'");
    $numResults = mysqli_num_rows($resultset);
    if ($numResults > 0) {
        while ($row = mysqli_fetch_assoc($resultset)) {
            $json_array[] = $row;
        }
    } else {
        $json_array[] = $rossz;
    }

    return (json_encode($json_array, JSON_UNESCAPED_UNICODE));
}
echo osszegLeKerdez($_GET["kartya"]);
