import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import Search from "./Search";

function Home() {
  const [movie, setMovie] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchMovies = async (query = "") => {
    setLoad(true);
    try {
      // Points to your local Node.js server
      const url = query 
        ? `http://localhost:3000/?search=${query}` 
        : `http://localhost:3000/`;
        
      const response = await fetch(url);
      const result = await response.json();
      
      // Your backend returns { message, data, total }
      setMovie(result.data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchMovies(); // Initial load of all movies
  }, []);

  return (
    <div className="home">
      <Search onSearch={fetchMovies} />
      {load ? (
        <div className="loader-box">
          <div className="custom-spinner"></div>
          <p className="loading-text">Fetching Movies...</p>
        </div>
      ) : (
        <MovieCard movie={movie} />
      )}
    </div>
  );
}

export default Home;