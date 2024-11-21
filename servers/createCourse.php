<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include "connection.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['title']) || !isset($input['description']) || !isset($input['instructor_id'])) {
    echo json_encode(["status" => "error", "message" => "Title, description, and instructor ID are required."]);
    exit;
}

$title = $input['title'];
$description = $input['description'];
$instructor_id = $input['instructor_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $sql = "INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $title,$description,$instructor_id);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Course created successfully."]);
}else{
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
