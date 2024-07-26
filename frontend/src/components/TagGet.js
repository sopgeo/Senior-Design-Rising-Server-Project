import React, { useEffect, useState } from 'react';
import Path from "../components/Path";
import Select from 'react-select';

const TagGet = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch(Path.buildPath("api/tag/tags", true));
      if (response.ok) {
        const json = await response.json();
        setTags(json);
      } else {
        console.error('Failed to fetch tags:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTags.length} tag(s)?`)) {
      deleteTags();
    }
  };

  const deleteTags = async () => {
    const deletePromises = selectedTags.map(async (tag) => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token
        const response = await fetch(Path.buildPath("api/tag/deleteTag", true), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ tag_id: tag.value })
        });

        if (!response.ok) {
          const json = await response.json();
          console.error('Failed to delete tag:', json);
        } else {
          fetchTags(); 
        }
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    });

    await Promise.all(deletePromises);
    setSelectedTags([]);
  };

  const handleAddTag = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await fetch(Path.buildPath("api/tag/createTag", true), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: newTagName })
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Tag created:', json.message);
        fetchTags(); 
        setNewTagName(''); 
      } else {
        const json = await response.json();
        console.error('Failed to create tag:', json);
      }
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const options = tags.map(tag => ({
    value: tag.tag_id,
    label: tag.name,
  }));

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: '20px',
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

  const selectStyle = {
    width: '300px',
    marginBottom: '10px',
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    width: '200px',
    boxSizing: 'border-box',
  };

  const addButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '150px',
    height: '40px',
    fontSize: '16px',
    textAlign: 'center',
  };

  return (
    <div className="tags-container" style={containerStyle}>
      <div style={sectionStyle}>
        <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#000', fontSize: '20px', marginTop: '0' }}>Add a new tag</h3>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Enter tag name"
          style={inputStyle}
        />
        <button onClick={handleAddTag} style={addButtonStyle}>
          Add
        </button>
      </div>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Select tags for deletion</h2>
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectedTags}
          isMulti
          styles={{
            container: (provided) => ({
              ...provided,
              ...selectStyle
            })
          }}
        />
        <button onClick={confirmDelete} style={addButtonStyle}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TagGet;
