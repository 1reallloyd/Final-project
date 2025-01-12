<?php
class FileHandler {
    private $uploadDir;
    private $allowedTypes;
    private $maxSize;

    public function __construct() {
        $this->uploadDir = '../uploads/';
        $this->allowedTypes = ['csv', 'json'];
        $this->maxSize = 50 * 1024 * 1024; // 50MB
        
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0777, true);
        }
    }

    public function handleUpload($file) {
        try {
            $this->validateFile($file);
            
            $fileName = uniqid() . '_' . basename($file['name']);
            $targetPath = $this->uploadDir . $fileName;
            
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                return [
                    'status' => 'success',
                    'message' => 'File uploaded successfully',
                    'path' => $targetPath
                ];
            }
            
            throw new Exception('Failed to move uploaded file');
        } catch (Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    private function validateFile($file) {
        // Check file size
        if ($file['size'] > $this->maxSize) {
            throw new Exception('File size exceeds limit of 50MB');
        }

        // Check file type
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, $this->allowedTypes)) {
            throw new Exception('Invalid file type. Allowed types: ' . implode(', ', $this->allowedTypes));
        }
    }
}