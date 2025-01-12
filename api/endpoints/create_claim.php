<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../controllers/ClaimsController.php';

$controller = new ClaimsController();

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Process request
$result = $controller->create($data);

// Send response
http_response_code($result['status'] === 'success' ? 201 : 400);
echo json_encode($result);