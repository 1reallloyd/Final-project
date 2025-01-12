<?php
class AuthMiddleware {
    public static function authenticate($request) {
        $headers = getallheaders();
        
        if (!isset($headers['Authorization'])) {
            throw new Exception('No authorization token provided', 401);
        }
        
        try {
            $token = str_replace('Bearer ', '', $headers['Authorization']);
            // Verify token with Supabase client
            $decoded = self::verifyToken($token);
            return $decoded;
        } catch (Exception $e) {
            throw new Exception('Invalid token', 401);
        }
    }
    
    private static function verifyToken($token) {
        // Implementation would use Supabase PHP client
        // This is a placeholder for the actual implementation
        if (empty($token)) {
            throw new Exception('Invalid token');
        }
        return true;
    }
}