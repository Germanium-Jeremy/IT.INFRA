<?php
$serverName = "localhost";
$myUserName = "root";
$myPassword = "";
$dbName = "INFRAUSERS";

$conn = new mysqli($serverName,$myUserName,$myPassword,$dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET["email3"];
    $password = $_GET["password"];

    $result = $conn->query("SELECT * FROM USERS WHERE EMAIL='$email'");

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if ($user['PASSWORD'] === $password) {
            session_start();
            session_regenerate_id();
            echo json_encode($result);
            $_SESSION["user_id"] =  $user["ID"];
            header("Location:../gui/otherPages/index.html");
        } else {
            echo "<script>alert('Incorect Password')</script>";
            echo "Incorect Password";
        }
    } else {
        echo "Acount not found";
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $commentName = $_POST['commentName'];
    $theComment = $_POST['theComment'];
    $conn->query("INSERT INTO COMMENTS (COMMENT_NAME,THE_COMMENT) VALUES ('$commentName','$theComment');");
    echo json_encode(array("status"=>"succees"));
}else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
    $result = $conn->query("SELECT * FROM COMMENTS");
    $comments = array();
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode($comments);
}

$conn->close();