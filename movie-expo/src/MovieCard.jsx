import MovieList from "./MovieList.jsx";

function MovieCard({movie}) {
    if(movie.length === 0) return <p style={{textAlign: 'center'}}>No movie found....</p>
    
    return (
        <div className="movie-card-container">
            {movie.map((m) => (
                <MovieList  movie={m}/>
            ))}
        </div>
    );
}

export default MovieCard;