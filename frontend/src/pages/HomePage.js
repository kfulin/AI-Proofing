// HomePage component with file upload, preview, validation, and two-class labeling
import React, { useState } from 'react';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [label, setLabel] = useState(''); // New state for the label

  // Function to handle file selection with validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select an image file');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size should be less than 5 MB');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      setErrorMessage('');
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (selectedFile && label) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('label', label); // Attach label to form data

      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        alert(`File ${result.filename} with label "${label}" uploaded successfully!`);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    } else {
      alert('Please select a file and a label.');
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome! Upload your photos here.</p>
      {/* File input for selecting images */}
      <input type="file" onChange={handleFileChange} />
      {/* Show error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* Display image preview if available */}
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px', marginTop: '10px' }} />}
      {/* Label selection input with only two options */}
      <select onChange={(e) => setLabel(e.target.value)} value={label}>
        <option value="">Select a label</option>
        <option value="Class 1">Class 1</option>
        <option value="Class 2">Class 2</option>
      </select>
      {/* Button to trigger upload */}
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
}

export default HomePage;
