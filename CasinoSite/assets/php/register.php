<?php
if (!isset($_SERVER['HTTP_REFERER'])) {
    // redirect them to your desired location
    header('location: ../../menu/register.html');
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
        //echo $row["email"]." ".$row["fullName"];
    }
}
getTeljesTabla("users");

function emailG($email)
{
    $con = getdbCasino();
    $result = mysqli_query($con, "SELECT * FROM `users` WHERE email='$email'");
    if (mysqli_num_rows($result) < 1) {
        return $email;
    } else {
        echo "<script>
            alert('Ezt az emailt már beregisztrálták');
            window.location.href='../../menu/register.html';
            </script>";
    }
}

function adatTarol($name, $email, $password)
{
    $con = getdbCasino();
    $result = mysqli_query($con, "INSERT INTO `users`(`name`, `email`, `password`) VALUES ('" . $name . "', '" .titkositas(emailG($email)). "', '" . titkositas($password). "')");
    //============================================================================\\
    /*==*/
    $delete = mysqli_query($con, "DELETE FROM `users` WHERE email=''");/*==*/
    //============================================================================\\ 
    echo "<script>
        window.location.href='../../menu/login.html';
        </script>";
}
if (isset($_POST["email"])) {
    $emailT = $_POST["email"];
    $nameT = $_POST["fullName"];
    $passTF = $_POST["passwordFirst"];
    $passTA = $_POST["passwordAgain"];
    if ($passTF === $passTA) {
        adatTarol($nameT, $emailT, $passTF);
    } else echo "<script>alert('Nem egyezik a két jelszó')
    window.location.href='../../menu/register.html'</script>";
}






