import { Link } from 'react-router-dom';

function MovieList({ movie }) {
  // Construct the image URL pointing to your backend static folder
  const imageUrl = movie.Poster 
    ? `http://localhost:3000/uploads/${movie.Poster}` 
    : "https://via.placeholder.com/300x450";
// --- Inline Styles for Text Decor ---
  const cardStyle = {
    background: '#0f172a', // Navy blue background
    borderRadius: '15px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    margin: '0',
    fontSize: '1.2rem',
    fontWeight: '800',
    color: '#ffffff', // Pure White
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const yearStyle = {
    color: '#38bdf8', // Electric Blue
    fontWeight: '600',
    fontSize: '0.9rem',
    marginTop: '5px'
  };

  const buttonStyle = {
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '15px',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '900',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    background: '#ff0000', 
    color: '#ffffff',
    border: '2px solid #38bdf8',
    boxShadow: '0 4px 0px #b91c1c, 0 4px 15px rgba(56, 189, 248, 0.3)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  };
  return (
    <div className="movie-list">
      <img alt={movie.Title} src={imageUrl} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        {/* Updated to use 'Released' from your model */}
        <p>{movie.Released}</p> 
        {/* Updated to use '_id' from MongoDB */}
        <Link to={`/movie/${movie._id}`} style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.background = '#ffffff';
            e.target.style.color = '#ff0000';
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#ff0000';
            e.target.style.color = '#ffffff';
            e.target.style.transform = 'translateY(0px) scale(1)';
          }}>Details</Link>
      </div>
    </div>
  );
}

export default MovieList;