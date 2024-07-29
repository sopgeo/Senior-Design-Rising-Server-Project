import React, { useState } from 'react';
import Papa from 'papaparse';
import Path from "../components/Path";
import "../css/CsvUpload.css";

const CsvUpload = ({ onRefresh }) => {
  const [file, setFile] = useState(null);
  //const [errorRows, setErrorRows] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validFileTypes = ["text/csv", "application/vnd.ms-excel"];
    const fileExtension = selectedFile.name.split('.').pop();

    if (selectedFile && validFileTypes.includes(selectedFile.type) && fileExtension === "csv") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid .csv file.");
      setFile(null);
      e.target.value = ""; 
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      let errors = [];
      let sectionName = '';
      let sectionId = null;
      const batchSize = 25; 

      Papa.parse(file, {
        complete: async function(results) {
          const data = results.data;
          const totalRows = data.length;
          let startIndex = 1; 

          //console.log("CSV parsed successfully");
          //console.log(`Total rows: ${totalRows}`);

          if (data.length > 1) {
            sectionName = data[1][0];
            //console.log(`Section name: ${sectionName}`);
            try {
              const checkResponse = await fetch(Path.buildPath("api/section/checkSectionExists", true), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: sectionName })
              });

              const checkJson = await checkResponse.json();
              //console.log('Section check response:', checkJson);

              if (checkJson.section_id) {
                sectionId = checkJson.section_id;
              } else {
                const token = JSON.parse(localStorage.getItem('user')).token;
                const createResponse = await fetch(Path.buildPath("api/section/createSection", true), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
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
          }

          const processBatch = async (batch) => {
            //console.log(`Processing batch of size: ${batch.length}`);
            for (let row of batch) {
              let isValid = true;
              for (let key in row) {
                if (!row[key] || row[key].trim() === '') {
                  isValid = false;
                  break;
                }
              }

              if (Object.keys(row).length !== 4 || !isValid) {
                errors.push({ index: data.indexOf(row) + 1, row });
                continue;
              }

              const groupName = row[3];

              try {
                const checkGroupResponse = await fetch(Path.buildPath("api/group/checkGroupExists", true), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ title: groupName, section_id: sectionId })
                });

                const checkGroupJson = await checkGroupResponse.json();
                console.log('Group check response:', checkGroupJson);

                let groupId = null;

                if (checkGroupJson.group_id) {
                  groupId = checkGroupJson.group_id;
                } else {
                  const token = JSON.parse(localStorage.getItem('user')).token;
                  const createGroupResponse = await fetch(Path.buildPath("api/group/createGroup", true), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ title: groupName, section_id: sectionId })
                  });

                  if (createGroupResponse.ok) {
                    console.log('Group check response:', checkGroupJson);
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
                  const checkUserResponse = await fetch(Path.buildPath("api/user/checkUserExists", true), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ucf_id: ucfId })
                  });

                  const checkUserJson = await checkUserResponse.json();
                  //console.log('User check response:', checkUserJson);

                  if (!checkUserJson.exists) {
                    const token = JSON.parse(localStorage.getItem('user')).token;
                    const createUserResponse = await fetch(Path.buildPath("api/user/createUser", true), {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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

                    if (!createUserResponse.ok) {
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
          };

          while (startIndex < totalRows) {
            const batch = data.slice(startIndex, startIndex + batchSize);
            await processBatch(batch);
            startIndex += batchSize;
            //console.log(`Processed up to row: ${startIndex}`);
          }

          //console.log('All batches processed');

          if (errors.length > 0) {
            //setErrorRows(errors);
            showErrorsPopup(errors);
          }

          if (onRefresh) {
            onRefresh(); 
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

  return (
    <div className="csv-upload-container">
      <div className="csv-upload-section">
        <h2 className="csv-upload-heading">Select CSV to upload</h2>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            className="csv-upload-input" 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <button style={{ maxWidth: '150px'}}
            onClick={handleFileUpload} 
            className="csv-upload-button"
          >
            Upload CSV 
          </button>
        </div>
        <div style={{ textAlign: 'center'}}>
          <p>Class CSV files should have the header (FirstName,LastName,PID,GroupName) on line 1. Only the section name on line 2. Lines 3 and after should be student information
            in the format of the header. Larger files may take a minute to upload, please stay on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CsvUpload;
