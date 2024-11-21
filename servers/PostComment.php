<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

ini_set('display_errors', 1);
error_reporting(E_ALL);

include "connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if ( !isset($data['comment']) || !isset($data['visibility'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields"]);
        exit();
    }
    $comment = $data['comment'] ?? null;
    $visibility = $data['visibility'] ?? null; 
    $sql = "INSERT INTO comments (course_id, student_id, comment, visibility) VALUES (1, 1, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    $stmt->bindParam(':comment', $comment);
    $stmt->bindParam(':visibility', $visibility);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Comment posted successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to post comment."]);
    }
}

?>
