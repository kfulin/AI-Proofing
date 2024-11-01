// HomePage component with file upload functionality
import React, { useState } from 'react';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        alert(`File ${result.filename} uploaded successfully!`);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    } else {
      alert('No file selected');
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome! Upload your photos here.</p>
      {/* File input for selecting images */}
      <input type="file" onChange={handleFileChange} />
      {/* Button to trigger upload */}
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
}

export default HomePage;
