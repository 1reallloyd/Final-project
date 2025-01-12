<?php
class DataPreprocessor {
    public static function cleanData($data) {
        if (is_array($data)) {
            return array_map([self::class, 'cleanData'], $data);
        }
        
        if (is_string($data)) {
            // Remove special characters
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
        }
        
        return $data;
    }
    
    public static function normalizeAmount($amount) {
        // Remove currency symbols and commas
        $amount = preg_replace('/[^0-9.]/', '', $amount);
        return floatval($amount);
    }
    
    public static function formatDate($date, $format = 'Y-m-d') {
        return date($format, strtotime($date));
    }
}