<?php

include "connection.php";

    $sql = "SELECT * FROM courses";
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
    
$conn->close();
?>
