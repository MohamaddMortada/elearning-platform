<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include "connection.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "SELECT courses.*, instructors.name AS instructor_name 
            FROM courses 
            JOIN instructors ON courses.instructor_id = instructors.id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $courses=[];
        while ($row = $result->fetch_assoc()) {
            $courses[] = $row;
        }
        echo json_encode(["status" => "success", "courses" => $courses]);
    }else {
        echo json_encode(["status" => "success", "courses" => []]);
    }
}else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
    $conn->close();
?>
