<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['course_id'], $data['instructor_id'], $data['title'], $data['description'], $data['due_date'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

    $course_id = $data['course_id'];
    $instructor_id = $data['instructor_id'];
    $title = $data['title'];
    $description = $data['description'];
    $due_date = $data['due_date'];

    $sql = "INSERT INTO assignments (course_id, instructor_id, title, description, due_date) 
            VALUES (:course_id, :instructor_id, :title, :description, :due_date)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisss", $course_id, $instructor_id,$title,$description,$due_date);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Assignment posted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to post assignment"]);
    }

?>
