import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MOVIE_API_URL}/movies`)
      .then((response) => {
        const movieList = response.data.movies;

        if (Array.isArray(movieList)) {
          setMovies(movieList);
        } else {
          setError('Movie data was not returned in the expected format.');
        }
      })
      .catch((err) => {
        console.error('Failed to load movies:', err);
        setError('Unable to load movies. Please try again later.');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
