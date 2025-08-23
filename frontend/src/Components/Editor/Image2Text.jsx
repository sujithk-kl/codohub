import React, { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import toast from 'react-hot-toast';
import './Image2Text.css';

const Image2Text = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          setExtractedText('');
          setConfidence(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select a valid image file');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          setExtractedText('');
          setConfidence(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please drop a valid image file');
      }
    }
  };

  const extractText = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setExtractedText('');
    setConfidence(null);

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      const { data } = await worker.recognize(selectedImage);
      
      setExtractedText(data.text);
      setConfidence(data.confidence);
      
      await worker.terminate();
      
      toast.success('Text extracted successfully!');
    } catch (error) {
      console.error('OCR Error:', error);
      toast.error('Failed to extract text from image');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      toast.success('Text copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const clearAll = () => {
    setSelectedImage(null);
    setExtractedText('');
    setConfidence(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image2text-container">
      <div className="image2text-header">
        <h2>📷 Image to Text (OCR)</h2>
        <div className="image-controls">
          <button className="btn btn-primary" onClick={triggerFileInput}>
            📁 Upload Image
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={extractText}
            disabled={!selectedImage || isProcessing}
          >
            🔍 Extract Text
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={copyToClipboard}
            disabled={!extractedText}
          >
            📋 Copy
          </button>
          <button className="btn btn-secondary" onClick={clearAll}>
            🗑️ Clear
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div className="image2text-content">
        <div className="image-panel">
          <h3>Image Preview</h3>
          <div 
            className="image-drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="preview-image"
              />
            ) : (
              <div className="drop-zone-placeholder">
                <div className="drop-zone-icon">📷</div>
                <p>Click or drag an image here</p>
                <p className="drop-zone-hint">Supports JPG, PNG, GIF, BMP</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-panel">
          <h3>Extracted Text</h3>
          {isProcessing && (
            <div className="processing-status">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>Processing... {progress}%</p>
            </div>
          )}
          {confidence !== null && (
            <div className="confidence-info">
              <p>Confidence: <span className="confidence-score">{confidence.toFixed(1)}%</span></p>
            </div>
          )}
          <textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            placeholder="Extracted text will appear here..."
            className="extracted-textarea"
            rows="15"
            readOnly={isProcessing}
          />
        </div>
      </div>

      <div className="ocr-help">
        <h3>OCR Tips</h3>
        <div className="help-content">
          <ul>
            <li><strong>Image Quality:</strong> Use clear, high-resolution images for better results</li>
            <li><strong>Text Contrast:</strong> Ensure good contrast between text and background</li>
            <li><strong>Font Size:</strong> Larger, clearer fonts work better</li>
            <li><strong>Image Format:</strong> JPG, PNG, GIF, and BMP are supported</li>
            <li><strong>Processing Time:</strong> Larger images may take longer to process</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Image2Text;
