<?php
include "connection.php";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $student_id = $_POST['student_id'];
    $course_id = $_POST['course_id'];

    

    $stmt = $conn->prepare("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $student_id, $course_id);
    $stmt->execute();
    echo json_encode(["message" => "Enrollment successful."]);
    $stmt->close();
    $conn->close();
}
?>