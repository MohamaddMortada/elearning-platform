<?php
include 'connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_id = $_POST['student_id'] ?? null;
    $assignment_id = $_POST['assignment_id'] ?? null;

    if ($student_id && $assignment_id && isset($_FILES['file'])) {
        $uploadDir = 'uploads/';
        $fileName = basename($_FILES['file']['name']);
        $filePath = $uploadDir . time() . '_' . $fileName;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            //$sql = "INSERT INTO assignment_submissions (student_id, assignment_id, file_path) VALUES (1, 1, 'path2')";
            $sql = "INSERT INTO assignment_submissions (student_id, assignment_id, file_path) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("iis", $student_id, $assignment_id, $filePath);

            if ($stmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Assignment submitted successfully"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Database error"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "File upload failed"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input data"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
