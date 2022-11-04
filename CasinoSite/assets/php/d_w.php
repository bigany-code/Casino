<?php
if (!isset($_SERVER['HTTP_REFERER'])) {
    // redirect them to your desired location
    header('location: ../../menu/d_w.html');
    exit;
}
include 'connect.php';

function deposit()
{
    $conBank = getdbBank();
    $conCasino = getdbCasino();
    $bankTmp = mysqli_query($conBank, "SELECT `osszeg` FROM `bankadat` WHERE kartyaszam='" . $_POST["cardNumber"] . "' AND kartyakod='" . $_POST["cardCode"] . "'");
    while ($row = mysqli_fetch_assoc($bankTmp)) {
        $bankOsszeg = $row["osszeg"];
    }
    $casinoTmp = mysqli_query($conCasino, "SELECT `money` FROM `users` WHERE id='" . $_POST["uid"] . "'");
    //--------------------------------//
    //FONTOS!!! zárójeleket leszedi
    while ($row = mysqli_fetch_assoc($casinoTmp)) {
        $casinoOsszeg = $row["money"];
    }
    //--------------------------------//
    $amountDepoWith = $_POST["amountDW"];
    $index = -1;
    // print_r($bankOsszeg+"\n");
    // print_r($casinoOsszeg+"\n");
    // print_r($amountDepoWith+"\n");

    //Akkor lesz egy ha alap helyzetben van(depositolni szeretnenk a bankbol az oldalra)
    if (!(isset($_POST["depoSW"]))) {
        $index = 1;
    }
    if ($amountDepoWith > $bankOsszeg && $index > 0) {
        echo "<script>window.location.href='../../menu/d_w.html'
        alert('Nincs elég pénzed vagy hibás adat')
        </script>";
        return;
    }
    if ($amountDepoWith > $casinoOsszeg && $index < 0) {
        echo "<script>window.location.href='../../menu/d_w.html'
        alert('Nincs elég pénzed vagy hibás adat')
        </script>";
        return;
    }
    //összeg negativ lesz, levonja a bankbol és casinohoz adja      (   - - => +   )
    //összeg pozitív lesz, levonja a casinobol és bankhoz adja      (   + - => -   )
    $szamolasBank = $bankOsszeg - ($index * $amountDepoWith);       //Depositolni szeretnenk Casinoba, akkor index=1 így levonja a bankbol, ha kivenni a casinobol az index=-1 íg hozzáadja a bank osszeghez
    $szamolasCasino = $casinoOsszeg + ($index * $amountDepoWith);

    $bankPenz = mysqli_query($conBank, "UPDATE `bankadat` SET `osszeg`='" . $szamolasBank . "' WHERE kartyaszam='" . $_POST["cardNumber"] . "' AND kartyakod='" . $_POST["cardCode"] . "'");
    $casinoPenz = mysqli_query($conCasino, "UPDATE `users` SET `money`='" . $szamolasCasino . "' WHERE id='" . $_POST["uid"] . "'");

    echo "<script>window.location.href='../../menu/d_w.html'
    alert('Sikeres tranzakció!')
    </script>";
    //kartyaszam
    //kartyakod
    //osszeg
}
if (isset($_POST["cardNumber"], $_POST["cardCode"], $_POST["amountDW"])) {
    echo deposit();
}

function getBal($id)
{
    $conCasino = getdbCasino();
    $casinoTmp = mysqli_query($conCasino, "SELECT `money` FROM `users` WHERE id='" . $id . "'");
    while ($row = mysqli_fetch_assoc($casinoTmp)) {
        $casinoOsszeg = $row["money"];
    }
    return $casinoOsszeg;
}

if (isset($_GET["sendBal"])) {
    echo (getBal($_GET["sendBal"]));
}


/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
function updateBal($id, $bet)
{
    $conCasino = getdbCasino();
    $casinoTmp = mysqli_query($conCasino, "UPDATE `users` SET `money`='" . $bet . "' WHERE id='" . $id . "'");

    // echo "<script>console.log('$bet')</script>";
    //return $casinoTmp;
}
if (isset($_GET["bet"])) {
    echo (updateBal($_GET["id"], $_GET["bet"]));
}
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
