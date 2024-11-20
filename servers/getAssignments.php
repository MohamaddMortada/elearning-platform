<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['course_id'])) {
    echo json_encode(["status" => "error", "message" => "Course ID is required"]);
    exit();
}

$course_id = $data['course_id'];


if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    if ($course_id) {
        $sql = "SELECT * FROM assignments WHERE course_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $course_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $assignments = [];
            while ($row = $result->fetch_assoc()) {
                $assignments[] = $row;
            }
            echo json_encode(["status" => "success", "assignments" => $assignments]);
        } else {
            echo json_encode(["status" => "success", "assignments" => []]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Course ID is required"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
