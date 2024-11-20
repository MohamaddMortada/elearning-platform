<?php
include 'connection.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $input = json_decode(file_get_contents('php://input'), true);
    $student_id = $input['student_id'] ?? null;
    $course_id = $input['course_id'] ?? null;

    if ($student_id && $course_id) {
        $sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $student_id, $course_id);

        if ($stmt->execute()) {
            $courseQuery = $conn->prepare("SELECT title FROM courses WHERE id = ?");
            $courseQuery->bind_param("i", $course_id);
            $courseQuery->execute();
            $result = $courseQuery->get_result();
            $course = $result->fetch_assoc();

            echo json_encode([
                "status" => "success",
                "courseTitle" => $course['title'],
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Enrollment failed."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
