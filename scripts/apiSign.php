<?php

$serverName = "localhost";
$myUserName = "root";
$myPassword = "";
$dbName = "INFRAUSERS";

$conn = new mysqli($serverName,$myUserName,$myPassword,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $userName = $_POST["userName"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $birthdate = $_POST["birthdate"];
        $location = $_POST["location"];
        $corporate = $_POST["corporate"];

        $conn->query("INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,BIRTHDATE,LOCATION,CORPORATE) VALUES ('$userName','$email','$password','$birthdate','$location','$corporate');");
        echo json_encode(array('status' => 'success'));
        break;

    case 'GET':
        $result = $conn->query("SELECT * FROM users");
        $students = array();
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
        echo json_encode($students);
        break;
        
    case 'PUT':
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $username = $_PUT['name'];
        $email = $_PUT['email'];
        $password = $_PUT['password'];
        $birthdate = $_PUT['birthdate'];
        $location = $_PUT['location'];
        $corporate = $_PUT['corporate'];
        $conn->query("UPDATE USERS SET USERNAME='$username', EMAIL='$email', PASSWORD='$password', BIRTHDATE='$birthdate', LOCATION='$location', CORPORATE='$corporate' WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;

    case 'DELETE':
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];
        $conn->query("DELETE FROM USERS WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;

    default:
        header('LOCATION:../gui/index.html');
        break;
}


$conn->close();