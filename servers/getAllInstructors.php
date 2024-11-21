<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include "connection.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = "SELECT * FROM instructors";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $instructors=[];
        while ($row = $result->fetch_assoc()) {
            $instructors[] = $row;
        }
        echo json_encode(["status" => "success", "instructors" => $instructors]);
    }else {
        echo json_encode(["status" => "success", "instructors" => []]);
    }
}else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
    $conn->close();
?>
