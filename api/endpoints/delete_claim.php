<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../controllers/ClaimsController.php';

$controller = new ClaimsController();

// Get claim ID
$claim_id = isset($_GET['id']) ? $_GET['id'] : die();

// Process request
$result = $controller->delete($claim_id);

// Send response
http_response_code($result['status'] === 'success' ? 200 : 400);
echo json_encode($result);