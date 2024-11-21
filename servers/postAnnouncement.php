<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['course_id'], $data['instructor_id'], $data['title'], $data['content'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

    $course_id = $data['course_id'];
    $instructor_id = $data['instructor_id'];
    $title = $data['title'];
    $content = $data['content'];
 

    $sql = "INSERT INTO announcements (course_id, instructor_id, title, content) 
            VALUES (:course_id, :instructor_id, :title, :description, :due_date)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiss", $course_id, $instructor_id,$title,$content);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Announcement posted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to post Announcement"]);
    }

?>
