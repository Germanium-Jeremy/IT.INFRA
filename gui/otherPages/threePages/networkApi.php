<?php

$conn = new mysqli("localhost", "root", "", "INFRAUSERS");

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $networkName = $_POST['networkName'];
        $networkSecurity = $_POST['networkSecurity'];
        $networkPassword = $_POST['networkPassword'];
        $encription = $_POST['encription'];
        $ipAddress = $_POST['ipAddress'];
        $networkOwner = $_POST['networkOwner'];
        $dhcpEnabled = $_POST['dhcpEnabled'];
        
        $sql = "INSERT INTO NETWORK (NETWORKNAME, NETWORKSECURITY, PASSWORD, ENCRIPTION, IPADDRESS, OWNER, DHCP) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssss", $networkName, $networkSecurity, $networkPassword, $encription, $ipAddress, $networkOwner, $dhcpEnabled);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            echo json_encode(array('Network' => 'Added'));
        } else {
            echo json_encode(array('error' => 'Failed to add network'));
        }
        $stmt->close();
        break;
    default:
        echo json_encode(array('error' => 'Invalid request method'));
        break;
}
$conn->close();