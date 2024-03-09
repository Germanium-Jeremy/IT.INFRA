<?php

$conn = new mysqli("localhost","root","","INFRAUSERS");
$mathod = $_SERVER['REQUEST_METHOD'];
if ($mathod == 'GET'){
    $eMail = $_GET['emaiL'];
    $result = $conn->query("SELECT * FROM users WHERE EMAIL='$eMail';");
    $user = $result->fetch_assoc();
    echo json_encode($user);
}

$conn->close();