import React, { useEffect, useState } from 'react';
import Path from "../components/Path";
import Select from 'react-select';
import '../css/TagGet.css';

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
        const token = JSON.parse(localStorage.getItem('user')).token;
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
    if (newTagName.trim() === '') {
      alert('Tag name cannot be empty!');
      return;
    }
    
    if (tags.some(tag => tag.name.toLowerCase() === newTagName.toLowerCase())) {
      alert('Tag already exists!');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
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

  const selectStyle = {
    container: (provided) => ({
      ...provided,
      width: '250px',
      marginBottom: '10px',
      boxSizing: 'border-box',
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '4px',
      minHeight: '25px',
    }),
    input: (provided) => ({
      ...provided,
      padding: '1px',
    }),
  };

  return (
    <div className="tags-container">
      <div className="section">
        <h3 className="section-heading">Add a new tag</h3>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Enter tag name"
          className="input"
        />
        <button onClick={handleAddTag} className="button">
          Add
        </button>
      </div>
      <div className="section">
        <h2 className="heading">Select tags for deletion</h2>
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectedTags}
          isMulti
          styles={selectStyle}
        />
        <button onClick={confirmDelete} className="button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TagGet;
