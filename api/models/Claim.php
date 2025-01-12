<?php
class Claim {
    private $conn;
    private $table = 'claims';

    // Claim properties
    public $claim_id;
    public $policy_number;
    public $policy_type;
    public $claim_date;
    public $claim_amount;
    public $location;
    public $claimant_age;
    public $incident_type;
    public $status;
    public $risk_score;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new claim
    public function create() {
        $query = "INSERT INTO " . $this->table . "
            SET
                claim_id = :claim_id,
                policy_number = :policy_number,
                policy_type = :policy_type,
                claim_date = :claim_date,
                claim_amount = :claim_amount,
                location = :location,
                claimant_age = :claimant_age,
                incident_type = :incident_type,
                status = :status,
                risk_score = :risk_score";

        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->claim_id = htmlspecialchars(strip_tags($this->claim_id));
        $this->policy_number = htmlspecialchars(strip_tags($this->policy_number));
        $this->policy_type = htmlspecialchars(strip_tags($this->policy_type));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->incident_type = htmlspecialchars(strip_tags($this->incident_type));
        $this->status = htmlspecialchars(strip_tags($this->status));

        // Bind parameters
        $stmt->bindParam(':claim_id', $this->claim_id);
        $stmt->bindParam(':policy_number', $this->policy_number);
        $stmt->bindParam(':policy_type', $this->policy_type);
        $stmt->bindParam(':claim_date', $this->claim_date);
        $stmt->bindParam(':claim_amount', $this->claim_amount);
        $stmt->bindParam(':location', $this->location);
        $stmt->bindParam(':claimant_age', $this->claimant_age);
        $stmt->bindParam(':incident_type', $this->incident_type);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':risk_score', $this->risk_score);

        return $stmt->execute();
    }

    // Read all claims
    public function read() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY claim_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}