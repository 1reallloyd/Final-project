<?php
class ResponseFormatter {
    public static function success($data = null, $message = 'Success') {
        return [
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ];
    }
    
    public static function error($message = 'Error', $code = 400) {
        return [
            'status' => 'error',
            'message' => $message,
            'code' => $code
        ];
    }
}