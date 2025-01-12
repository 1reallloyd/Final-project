<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../controllers/ClaimsController.php';

$controller = new ClaimsController();

// Get claim ID and data
$claim_id = isset($_GET['id']) ? $_GET['id'] : die();
$data = json_decode(file_get_contents("php://input"), true);
$data['claim_id'] = $claim_id;

// Process request
$result = $controller->update($data);

// Send response
http_response_code($result['status'] === 'success' ? 200 : 400);
echo json_encode($result);