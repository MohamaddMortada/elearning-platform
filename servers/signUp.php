<?php
input "connection.php";
require 'vendor/autoload.php';

use Firebase\JWT\JWT;

header('Content-Type: application/json');


$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name'], $data['password'])) {
    $name = $data['name'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT); 

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        $stmt = $conn->prepare("INSERT INTO students (name, password) VALUES (?,?)");
        $stmt->bind_param('ss', $name,$password);
        if ($stmt->execute(['name' => $name, 'password' => $password])) {
    
            $payload = [
                "ss" => "http://localhost",
                "iat" => time(),
                "exp" => time() + (60 * 60), 
                "name" => $name,
            ];
            $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');

            echo json_encode(['token' => $jwt]);
        } else {
            echo json_encode(['error' => 'User registration failed']);
        }
    } else {
    echo json_encode(['error' => 'Invalid input']);
}
}
?>
