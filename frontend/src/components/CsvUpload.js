import React, { useState } from 'react';
import axios from 'axios';
import "../css/CsvUpload.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', margin: '20px 0' }}>
    <div style={{ flex: '1 0 0' }}></div> {/* Left empty column */}
    <div style={{ flex: '0 1 auto', marginRight: '20px' }}> {/* Middle column with button */}
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileChange} 
        style={{ marginBottom: '10px', padding: '5px', width: '250px' }} 
      />
      <button 
        onClick={handleFileUpload} 
        style={{ 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          width: '150px', 
          height: '40px', 
          fontSize: '16px', 
          textAlign: 'center'
        }}>
        Upload CSV
      </button>
      </div>
      <div style={{ flex: '1 0 0', maxWidth: '400px', textAlign: 'center' }}> {/* Right column with text */}
        <p>Class CSV files should contain student names (First, Last Middle initial) in the leftmost column, student number in the second column, and group number in the third column.</p>
      </div>
    </div>
  );
};

export default FileUpload;