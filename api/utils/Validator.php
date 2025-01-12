<?php
class Validator {
    public static function validateClaim($data) {
        $errors = [];

        // Required fields
        $required = ['policy_number', 'policy_type', 'claim_amount', 'location'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                $errors[] = "$field is required";
            }
        }

        // Policy type validation
        $validPolicyTypes = ['Auto', 'Property', 'Health', 'Life', 'Business'];
        if (isset($data['policy_type']) && !in_array($data['policy_type'], $validPolicyTypes)) {
            $errors[] = "Invalid policy type";
        }

        // Amount validation
        if (isset($data['claim_amount']) && !is_numeric($data['claim_amount'])) {
            $errors[] = "Claim amount must be numeric";
        }

        // Date validation
        if (isset($data['claim_date']) && !strtotime($data['claim_date'])) {
            $errors[] = "Invalid date format";
        }

        return $errors;
    }
}