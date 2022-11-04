<?php
if (!isset($_SERVER['HTTP_REFERER'])) {
    // redirect them to your desired location
    header('location: ../../menu/login.html');

    exit;
}
include 'connect.php';


//Tábla lekérdezés
function getTeljesTabla($tableName)
{
    $con = getdbCasino();
    $resultset = mysqli_query($con, "SELECT * FROM `$tableName`");
    while ($row = mysqli_fetch_assoc($resultset)) {
        //print_r($row);
        //echo $row["email"]." ".$row["name"];
    }
}
getTeljesTabla("users");

function getId($email)
{
    $con = getdbCasino();
    $resultset = mysqli_query($con, "SELECT `id` FROM `users` WHERE `email`='$email'");
    $json_array = array();
    while ($row = mysqli_fetch_assoc($resultset)) {
        $json_array[] = $row;
    }
    return ($json_array[0]["id"]);
}
function getUname($em)
{
    $con = getdbCasino();
    $resultset = mysqli_query($con, "SELECT `name` FROM `users` WHERE `email`='$em'");
    $json_array = array();
    while ($row = mysqli_fetch_assoc($resultset)) {
        $json_array[] = $row;
    }
    return ($json_array[0]["name"]);
}
//Név küldés  
if (isset($_GET['getId'])) {
    echo getId($_GET['getId']);
}

if (isset($_POST["email"], $_POST["password"])) {
     $emailA = titkositas($_POST["email"]);
     $passA = titkositas($_POST["password"]);
    if (adatEll($emailA) == $passA) {
        echo "<script src='../js/main.js'></script>
            <script>
                setCookie('status','online',1);
                setCookie('id','" . getId($emailA) . "',1);
                setCookie('uname','" . getUname($emailA) . "',1)
                window.location.href='../../index.html';
            </script>";
    } else {
        echo  "<script>
        alert('Rossz email vagy jelszó!');
        window.location.href='../../menu/login.html';
        </script>";
    }
}
function adatEll($emailK)
{
    $con = getdbCasino();
    $result = mysqli_query($con, "SELECT `password` FROM `users` WHERE `email`='$emailK'");
    while ($row = mysqli_fetch_assoc($result)) {
        return $row['password'];
    }
}
