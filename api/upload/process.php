<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/database.php';

class FileProcessor {
    private $conn;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    public function processUpload() {
        if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $tempName = $_FILES['file']['tmp_name'];
            $fileName = $_FILES['file']['name'];
            
            // Get file extension
            $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            
            if ($extension === 'csv') {
                return $this->processCSV($tempName);
            } elseif ($extension === 'json') {
                return $this->processJSON($tempName);
            } else {
                return ["error" => "Unsupported file format"];
            }
        }
        return ["error" => "Upload failed"];
    }
    
    private function processCSV($file) {
        $claims = [];
        if (($handle = fopen($file, "r")) !== FALSE) {
            // Read header row
            $headers = fgetcsv($handle);
            
            while (($data = fgetcsv($handle)) !== FALSE) {
                $claim = array_combine($headers, $data);
                if ($this->validateClaim($claim)) {
                    $claims[] = $claim;
                }
            }
            fclose($handle);
            
            return $this->saveClaims($claims);
        }
        return ["error" => "Failed to process CSV"];
    }
    
    private function validateClaim($claim) {
        // Add validation logic here
        return true;
    }
    
    private function saveClaims($claims) {
        try {
            $this->conn->beginTransaction();
            
            $stmt = $this->conn->prepare("INSERT INTO claims (claim_id, policy_number, policy_type, claim_date, claim_amount, location, claimant_age, incident_type, status, risk_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            
            foreach ($claims as $claim) {
                $stmt->execute([
                    $claim['claim_id'],
                    $claim['policy_number'],
                    $claim['policy_type'],
                    $claim['claim_date'],
                    $claim['claim_amount'],
                    $claim['location'],
                    $claim['claimant_age'],
                    $claim['incident_type'],
                    $claim['status'],
                    $claim['risk_score']
                ]);
            }
            
            $this->conn->commit();
            return ["success" => true, "message" => "Data uploaded successfully"];
        } catch (Exception $e) {
            $this->conn->rollBack();
            return ["error" => $e->getMessage()];
        }
    }
}

// Initialize database connection
$database = new Database();
$db = $database->getConnection();

// Process the upload
$processor = new FileProcessor($db);
echo json_encode($processor->processUpload());