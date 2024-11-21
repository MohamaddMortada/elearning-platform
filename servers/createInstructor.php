<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "connection.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['name']) || !isset($input['email'])) {
    echo json_encode(["status" => "error", "message" => "Name and email are required."]);
    exit;
}

$name = $input['name'];
$email = $input['email'];
$assigned_courses = isset($input['assigned_courses']) ? $input['assigned_courses'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    

    $sql = "INSERT INTO instructors (name, email, assigned_courses) VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name,$email,$assigned_courses);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Instructor created successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
$conn->close();
?>
