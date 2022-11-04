<?php
function getdbBank()
{
    $servername = "";
    $username = "";
    $password = "";
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
function getdbCasino()
{
    $servername = "";
    $username = "";
    $password = "";
    $db = "casino";
    try {
        $con = mysqli_connect($servername, $username, $password, $db);
        mysqli_query($con, "SET CHARACTER SET utf8");
        //echo "Connected successfully"; 
    } catch (exception $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    return $con;
}
//titkositas
//$encryption_iv string hossza nem enged,$encryption_key változtatható
function titkositas($string)
{

    $simple_string = $string;
    $ciphering = "AES-128-CTR";
    $iv_length = openssl_cipher_iv_length($ciphering);
    $options = 0;
    $encryption_iv = '1234567891075392';
    $encryption_key = "asd";
    $encryption = openssl_encrypt(
        $simple_string,
        $ciphering,
        $encryption_key,
        $options,
        $encryption_iv
    );
    return $encryption;
}
function feloldas($kiszedes)
{
    $ciphering = "AES-128-CTR";
    $options = 0;
    $decryption_iv = '1234567891075392';
    $decryption_key = "asd";
    $decryption = openssl_decrypt(
        $kiszedes,
        $ciphering,
        $decryption_key,
        $options,
        $decryption_iv
    );
}