<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include "connection.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id']) || $input['title']) || !isset($input['description']) || !isset($input['instructor_id']) {
    echo json_encode(["status" => "error", "message" => "Id, Title, description, and instructor ID are required."]);
    exit;
}
$id = $input['id'];
$title = $input['title'];
$description = $input['description'];
$instructor_id = $input['instructor_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $sql = "UPDATE courses SET title = ?, description = ?, instructor_id = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssii', $title,$description,$instructor_id,$id);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Course edited successfully."]);
}else{
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
