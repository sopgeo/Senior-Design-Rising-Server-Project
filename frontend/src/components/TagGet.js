import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TagGet = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
      fetchTags()
  }, []);

  const fetchTags = async () => {
    const response = await fetch('http://localhost:5000/api/tag/tags')
    const json = await response.json();
      if (response.ok) {
        setTags(json);
      }
  }
  return (
    <div className="tags-container">
      <h2>Tags</h2>
      <ul>
        {tags.map(tag => (
          <li key={tag.tag_id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagGet;
