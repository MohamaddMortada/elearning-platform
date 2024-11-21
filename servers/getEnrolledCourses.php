<?php

include "connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
error_reporting(E_ALL);

$id = $input['student_id'];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "SELECT * FROM courses WHERE student_id=1";
    $stmt = $conn->prepare($sql);
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $courses = [];
        while ($row = $result->fetch_assoc()) {
            $courses[] = $row;
        }
        echo json_encode(["status" => "success", "courses" => $courses]);
    } else {
        echo json_encode(["status" => "success", "courses" => []]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
