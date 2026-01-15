import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    genre: '',
    plot: '',
    year: ''
  });
  const [file, setFile] = useState(null); // Store the actual file object
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Create FormData because the backend uses Multer for images
  const formData = new FormData();
  formData.append('Title', movie.title);   // Must match Mongoose Schema
  formData.append('Genre', movie.genre);
  formData.append('Released', movie.year); // Backend expects 'Released'
  formData.append('Plot', movie.plot);
  
  const fileInput = e.target.querySelector('input[type="file"]');
  if (fileInput.files[0]) {
    formData.append('Poster', fileInput.files[0]); // Must match .single('Poster')
  }

  try {
    const response = await fetch('http://localhost:3000/create', {
      method: 'POST',
      body: formData, // Browser sets 'multipart/form-data' automatically
    });

    if (response.ok) {
      alert("Movie added successfully!");
      navigate('/');
    } else {
      alert("Server error: Failed to add movie.");
    }
  } catch (error) {
    console.error("Connection Error:", error);
    alert("Could not connect to the server.");
  }
};
  return (
    <div className="add-container" style={{ padding: '40px 10%', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--accent-color)' }}>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="search-form" style={{ flexDirection: 'column', gap: '15px', maxWidth: '100%' }}>
        
        <input 
          type="text" 
          name="title" 
          placeholder="Movie Title" 
          className="searchInput"
          onChange={handleChange} 
          required 
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            name="genre" 
            placeholder="Genre" 
            className="searchInput"
            onChange={handleChange} 
          />
          <input 
            type="text" 
            name="year" 
            placeholder="Year (e.g., 2024)" 
            className="searchInput"
            onChange={handleChange} 
          />
        </div>

        <div className="file-upload" style={{ border: '1px dashed var(--text-dim)', padding: '10px', borderRadius: '10px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-dim)' }}>Upload Poster</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: '80px', marginTop: '10px', borderRadius: '5px' }} />
          )}
        </div>

        <textarea 
          name="plot" 
          placeholder="Plot Summary" 
          className="searchInput"
          style={{ height: '100px', borderRadius: '15px' }}
          onChange={handleChange}
        />

        <button type="submit" className="search-button" style={{ width: '100%' }}>
          Save Movie
        </button>
      </form>
    </div>
  );
}

export default Add;