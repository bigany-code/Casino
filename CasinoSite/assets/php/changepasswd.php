<?php
if (!isset($_SERVER['HTTP_REFERER'])) {
    // redirect them to your desired location
    header('location: ../../menu/profile.html');
    exit;
}
include 'connect.php';

function getPassword($email, $oldPassword, $newPassword, $newPasswordAgain)
{
    $con = getdbCasino();
    $result = mysqli_query($con, "SELECT `password` FROM `users` WHERE email='" . titkositas($email) . "'");
    while ($row = mysqli_fetch_assoc($result)) {
        $oPwdCheck = $row["password"];
    }

    //a beirtregi jelszo egyezik a regi jelszoval és a beírt új jelszavak egyeznek
    if (titkositas($oldPassword) == $oPwdCheck && $newPassword == $newPasswordAgain) {
        changePasswd(titkositas($email), titkositas($newPassword));
    } elseif($newPassword != $newPasswordAgain) {
        echo  "<script>
        alert('Az új jelszavak nem egyeznek');
        window.location.href='../../menu/change_password.html';
        </script>";
    }
}
function changePasswd($email, $password)
{
    $con = getdbCasino();
    mysqli_query($con, "UPDATE `users` SET `password`='" . $password . "' WHERE email='" . $email . "'");
    echo "<script>window.location.href='../../menu/profile.html';</script>";
}
if (isset($_POST["email"], $_POST["oldPassword"], $_POST["newPassword"], $_POST["newPasswordAgain"])) {
    $em = $_POST["email"];
    $oPwd = $_POST["oldPassword"];
    $nPwd = $_POST["newPassword"];
    $nPwdAg = $_POST["newPasswordAgain"];

    if (adatEll($em) == titkositas($oPwd)) {
        getPassword($em, $oPwd, $nPwd, $nPwdAg);
    } else {
        echo  "<script>
        alert('Rossz email vagy jelszó!');
        window.location.href='../../menu/change_password.html';
        </script>";
    }
}
function adatEll($emailK)
{
    $con = getdbCasino();
    $result = mysqli_query($con, "SELECT `password` FROM `users` WHERE `email`='" . titkositas($emailK) . "'");
    while ($row = mysqli_fetch_assoc($result)) {
        return $row['password'];
    }
}
