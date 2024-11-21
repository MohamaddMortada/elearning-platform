<?php
require "connection.php";
require 'vendor/autoload.php';

use Firebase\JWT\JWT;

function authenticate($token) {
    try {
        $decoded = JWT::decode($token, JWT_SECRET, ['HS256']);
        return $decoded;
    } catch (Exception $e) {
        return null;
    }
}
?>
