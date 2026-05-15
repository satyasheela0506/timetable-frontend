import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

const ImageUpload = ({ onUploadSuccess, defaultImage = '' }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Please upload JPG, PNG, or PDF.');
        setSelectedFile(null);
        setPreviewUrl(defaultImage);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size too large. Maximum size is 5MB.');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setMessage(null);

      // Create preview URL
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl('https://via.placeholder.com/150?text=PDF+Document');
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      setMessage('File uploaded successfully!');
      if (onUploadSuccess) {
        onUploadSuccess(response.data.url);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error uploading file. Please try again.');
    }
  };

  const resetSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(defaultImage);
    setError(null);
    setMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container p-3 border rounded bg-light">
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Profile Image / File</Form.Label>
        
        <div className="d-flex align-items-center gap-3 mb-3">
          <div 
            className="preview-box border rounded d-flex align-items-center justify-content-center overflow-hidden"
            style={{ width: '120px', height: '120px', backgroundColor: '#f8f9fa' }}
          >
            {previewUrl ? (
              <Image src={previewUrl} fluid style={{ objectFit: 'cover', height: '100%' }} />
            ) : (
              <Upload size={32} className="text-muted" />
            )}
          </div>
          
          <div className="flex-grow-1">
            <Form.Control 
              type="file" 
              onChange={handleFileChange} 
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.pdf"
              className="mb-2"
            />
            <small className="text-muted d-block">Supported formats: JPG, PNG, PDF (Max 5MB)</small>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="py-2 d-flex align-items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </Alert>
        )}

        {message && (
          <Alert variant="success" className="py-2 d-flex align-items-center gap-2">
            <CheckCircle size={18} />
            {message}
          </Alert>
        )}

        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            onClick={handleUpload} 
            disabled={!selectedFile || loading}
            className="d-flex align-items-center gap-2"
          >
            {loading ? <Spinner animation="border" size="sm" /> : <Upload size={18} />}
            {loading ? 'Uploading...' : 'Upload to Cloudinary'}
          </Button>
          
          {selectedFile && !loading && (
            <Button variant="outline-secondary" onClick={resetSelection}>
              <X size={18} />
            </Button>
          )}
        </div>
      </Form.Group>
    </div>
  );
};

export default ImageUpload;
