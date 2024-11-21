<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['course_id'], $data['student_email'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

    $course_id = $data['course_id'];
    $student_email = $data['student_email'];

    $sql = "INSERT INTO invitations (course_id, student_email) VALUES (?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $course_id,$student_emai);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Invitation sent successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send invitation"]);
    }

?>
