import React, { useState } from 'react';
import Papa from 'papaparse';
import "../css/CsvUpload.css";

const CsvUpload = () => {
  const [file, setFile] = useState(null);
  const [errorRows, setErrorRows] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      let errors = [];
      let sectionName = '';
      let sectionId = null;

      Papa.parse(file, {
        complete: async function(results) {
          for (let index = 0; index < results.data.length; index++) {
            const row = results.data[index];

            if (index === 0) {
              continue;
            }

            if (index === 1) {
              sectionName = row[0]; 
              try {
                const checkResponse = await fetch('http://localhost:5000/api/section/checkSectionExists', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ title: sectionName })
                });

                const checkJson = await checkResponse.json();

                if (checkJson.section_id) {
                  sectionId = checkJson.section_id;
                } else {
                  const createResponse = await fetch('http://localhost:5000/api/section/createSection', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: sectionName })
                  });

                  if (createResponse.ok) {
                    const createJson = await createResponse.json();
                    sectionId = createJson.section_id;
                  } else {
                    const createJson = await createResponse.json();
                    console.error('Failed to create section:', createJson);
                  }
                }
              } catch (error) {
                console.error('Error creating section:', error);
              }

              continue;
            }

            let isValid = true;
            for (let key in row) {
              if (!row[key] || row[key].trim() === '') {
                isValid = false;
                break;
              }
            }

            if (Object.keys(row).length !== 4 || !isValid) {
              errors.push({ index: index + 1, row });
            } else {
              const groupName = row[3]; 

              try {
                const checkGroupResponse = await fetch('http://localhost:5000/api/group/checkGroupExists', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ title: groupName, section_id: sectionId })
                });

                const checkGroupJson = await checkGroupResponse.json();

                let groupId = null;

                if (checkGroupJson.group_id) {
                  groupId = checkGroupJson.group_id;
                } else {
                  const createGroupResponse = await fetch('http://localhost:5000/api/group/createGroup', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: groupName, section_id: sectionId })
                  });

                  if (createGroupResponse.ok) {
                    const createGroupJson = await createGroupResponse.json();
                    groupId = createGroupJson.group_id;
                  } else {
                    const createGroupJson = await createGroupResponse.json();
                    console.error('Failed to create group:', createGroupJson);
                  }
                }

                const firstName = row[0];
                const lastName = row[1];
                const ucfId = row[2];

                try {
                  const checkUserResponse = await fetch('http://localhost:5000/api/user/checkUserExists', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ucf_id: ucfId })
                  });

                  const checkUserJson = await checkUserResponse.json();

                  if (checkUserJson.exists) {
                  } else {
                    const createUserResponse = await fetch('http://localhost:5000/api/user/createUser', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        ucf_id: ucfId,
                        password: ucfId, 
                        type: 'student',
                        group_id: groupId,
                        first_name: firstName,
                        last_name: lastName,
                        section: sectionId
                      })
                    });

                    if (createUserResponse.ok) {
                      const createUserJson = await createUserResponse.json();
                    } else {
                      const createUserJson = await createUserResponse.json();
                      console.error('Failed to create user:', createUserJson);
                    }
                  }
                } catch (error) {
                  console.error('Error creating user:', error);
                }
              } catch (error) {
                console.error('Error creating group:', error);
              }

            }
          }

          if (errors.length > 0) {
            setErrorRows(errors);
            showErrorsPopup(errors);
          }
        },
      });
    }
  };

  const showErrorsPopup = (errors) => {
    let message = 'Error Rows:\n';
    errors.forEach(({ index, row }) => {
      message += `Row ${index}: ${JSON.stringify(row)}\n`;
    });
    alert(message);
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
          <p>Class CSV files should have the header (FirstName,LastName,PID,GroupName) on line 1. Only the section name on line 2. Lines 3 and after should be student information
            in the format of the header.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CsvUpload;
