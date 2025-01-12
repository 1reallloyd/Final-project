<?php
require_once '../config/database.php';
require_once '../models/Claim.php';
require_once '../utils/Validator.php';

class ClaimsController {
    private $db;
    private $claim;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->claim = new Claim($this->db);
    }

    public function create($data) {
        // Validate input
        $errors = Validator::validateClaim($data);
        if (!empty($errors)) {
            return [
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $errors
            ];
        }

        // Set claim properties
        foreach ($data as $key => $value) {
            if (property_exists($this->claim, $key)) {
                $this->claim->$key = $value;
            }
        }

        // Create claim
        if ($this->claim->create()) {
            return [
                'status' => 'success',
                'message' => 'Claim created successfully'
            ];
        }

        return [
            'status' => 'error',
            'message' => 'Failed to create claim'
        ];
    }

    public function getAll() {
        $stmt = $this->claim->read();
        $claims = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($claims, $row);
        }

        return [
            'status' => 'success',
            'data' => $claims
        ];
    }
}