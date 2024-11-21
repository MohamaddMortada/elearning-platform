<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");


include "connection.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['instructor_id']) || !isset($input['assigned_courses'])) {
    echo json_encode(["status" => "error", "message" => "Instructor ID and assigned courses are required."]);
    exit;
}

$instructor_id = $input['instructor_id'];
$assigned_courses = $input['assigned_courses']; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $sql = "UPDATE instructors SET assigned_courses = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $assigned_courses,$instructor_id);

    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Instructor's courses updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
$conn->close();
?>
