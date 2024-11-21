<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include "connection.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id'])) {
    echo json_encode(["status" => "error", "message" => "Id is required."]);
    exit;
}
$id = $input['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $sql = "DELETE FROM courses (id) WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$id);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Course deleted successfully."]);
}else{
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
