<?php
include 'connection.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('display_errors', 1);
error_reporting(E_ALL);

/*if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $course_id = $input['course_id'] ?? null;
if($course_id){
    $sql = "SELECT * FROM assignments WHERE course_id=5" ;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $course_id);
    $stmt->execute();
    $result=$stmt->get_result();
    if ($result->num_rows > 0) {
        $assignments = [];
        while ($row = $result->fetch_assoc()) {
            $assignments[] = $row;
        }
        echo json_encode(["status" => "success", "assignments" => $assignments]);
    }
}
}*/


$sql = "SELECT * FROM assignments WHERE course_id=5";
        $stmt = $conn->prepare($sql);

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

?>