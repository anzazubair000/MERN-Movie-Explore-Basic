import React, { useState } from "react";

function Search({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // This stops the page from refreshing!
    onSearch(input);    // This "sends" the input back up to the Home component
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
          className="searchInput" 
          placeholder="Search for a movie..." 
          onChange={(e) => setInput(e.target.value)} // Updates the text as you type
          value={input}
          
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;