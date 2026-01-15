import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieD, setMovieD] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const result = await fetch(`http://localhost:3000/read/${id}`);
        const json = await result.json();
        if (json.data) {
          setMovieD(json.data);
          setEditData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    }
    getMovies();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", editData.Title);
    formData.append("Genre", editData.Genre);
    formData.append("Released", editData.Released);
    formData.append("Plot", editData.Plot);

    if (file) formData.append("Poster", file);

    try {
      const response = await fetch(`http://localhost:3000/update/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMovieD(result.data);
        setIsEditing(false);
        setFile(null);
        setImagePreview(null);
        alert("Movie updated successfully!");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" });
        if (response.ok) navigate("/");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  if (!movieD) return <div className="loader-box"><div className="custom-spinner"></div></div>;

  return (
    <div className="detail-container" style={{ padding: "2rem 10%" }}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="add-container">
          <h2>Edit Movie</h2>
          
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Left: Inputs */}
            <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "10px" }}>
              <input 
                type="text" 
                value={editData.Title || ""} 
                onChange={(e) => setEditData({ ...editData, Title: e.target.value })} 
                className="searchInput" 
                placeholder="Title"
              />
              <input 
                type="text" 
                value={editData.Genre || ""} 
                onChange={(e) => setEditData({ ...editData, Genre: e.target.value })} 
                className="searchInput" 
                placeholder="Genre"
              />
              <input 
                type="text" 
                value={editData.Released || ""} 
                onChange={(e) => setEditData({ ...editData, Released: e.target.value })} 
                className="searchInput" 
                placeholder="Year"
              />
              <textarea 
                value={editData.Plot || ""} 
                onChange={(e) => setEditData({ ...editData, Plot: e.target.value })} 
                className="searchInput" 
                style={{ height: "100px" }}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="search-button">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="search-button" style={{ background: "gray" }}>Cancel</button>
              </div>
            </div>

            {/* Right: Poster Edit */}
            <div style={{ flex: 1, textAlign: "center" }}>
              <img 
                src={imagePreview || `http://localhost:3000/uploads/${movieD.Poster}`} 
                alt="Preview" 
                style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }} 
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
        </form>
      ) : (
        <div className="movie-detail" style={{ display: "flex", gap: "40px" }}>
          <img src={`http://localhost:3000/uploads/${movieD.Poster}`} alt={movieD.Title} style={{ width: "300px", borderRadius: "10px" }} />
          <div>
            <h1>{movieD.Title}</h1>
            <p><strong>Genre:</strong> {movieD.Genre}</p>
            <p><strong>Released:</strong> {movieD.Released}</p>
            <p className="plot-text">{movieD.Plot}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button onClick={() => setIsEditing(true)} className="search-button">Update</button>
              <button onClick={handleDelete} className="search-button" style={{ background: "#ef4444" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;