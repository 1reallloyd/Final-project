<?php
class ValidationMiddleware {
    public static function validateClaim($data) {
        $required_fields = ['policy_number', 'policy_type', 'claim_amount', 'location'];
        $errors = [];
        
        // Check required fields
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $errors[] = "$field is required";
            }
        }
        
        // Validate policy type
        if (isset($data['policy_type'])) {
            $valid_types = ['Auto', 'Property', 'Health', 'Life', 'Business'];
            if (!in_array($data['policy_type'], $valid_types)) {
                $errors[] = "Invalid policy type";
            }
        }
        
        // Validate amount
        if (isset($data['claim_amount'])) {
            if (!is_numeric($data['claim_amount']) || $data['claim_amount'] <= 0) {
                $errors[] = "Invalid claim amount";
            }
        }
        
        return $errors;
    }
}