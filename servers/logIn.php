<?php
require "connection.php"; 
require 'vendor/autoload.php';

use Firebase\JWT\JWT;

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name'], $data['password'])) {
    $name = $data['name'];
    $password = $data['password'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
        $stmt->bind_param('ss', $name,$password);
        $stmt->execute(['name' => $name]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $payload = [
                "iss" => "http://localhost",
                "iat" => time(),
                "exp" => time() + (60 * 60), 
                "name" => $name,
            ];
            $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');

            echo json_encode(['token' => $jwt]);
        } else {
            echo json_encode(['error' => 'Invalid name or password']);
        }
    } }
else {
    echo json_encode(['error' => 'Invalid input']);
}
?>
