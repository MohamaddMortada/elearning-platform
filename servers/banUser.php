<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id'], $input['role'], $input['ban'])) {
    echo json_encode(["status" => "error", "message" => "Id, role, and ban status are required."]);
    exit;
}
    $id = $input['id'];
    $role = $input['role'];
    $ban = $input['ban'];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if($role === 'student'){

            $sql = "UPDATE students status=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('si', $ban,$id);
            $stmt->execute();
        }
        if($role === 'instructor'){
            
            $sql = "UPDATE instructors status=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('si', $ban,$id);
            $stmt->execute();
        }

    echo json_encode(["status" => "success", "message" => "User status updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
}
?>
