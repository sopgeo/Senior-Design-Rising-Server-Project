import React, { useState } from 'react';
import axios from 'axios';
import "../css/CsvUpload.css";

const CsvUpload = () => {
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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', 
    marginBottom: '20px',
    marginTop: '0px', 
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center', 
    marginBottom: '20px',
    marginRight: '20px', 
    marginTop: '0', 
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#000',
    fontSize: '20px', 
    marginTop: '0', 
  };

  return (
    <div className="csv-upload-container" style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Select CSV to upload</h2>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            style={{ padding: '5px', width: '250px' }} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
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
              textAlign: 'center',
            }}>
            Upload CSV
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>Class CSV files should contain student names (First, Last Middle initial) in the leftmost column, student number in the second column, and group number in the third column.</p>
        </div>
      </div>
    </div>
  );
};

export default CsvUpload;
