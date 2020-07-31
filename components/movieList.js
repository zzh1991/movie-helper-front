import React, { Component } from 'react';
import styled from 'styled-components';

class MovieList extends Component {
  render() {
    const { movieList } = this.props;
    return (
      <MovieContainer>
        {movieList.map((movie) => {
          return (
            <Movie>
              <MovieInfo>
                <a href={movie.url} target="_blank" rel="noreferrer">{movie.title}</a>
                <p style={{ display: 'grid', justifyItems: 'end' }}>{movie.rating}</p>
              </MovieInfo>
              <img src={movie.imageLarge} alt={movie.imageLarge} />
            </Movie>
          );
        })}
      </MovieContainer>
    );
  }
}

const MovieContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  place-items: center;
`;

const Movie = styled.div`
// display: grid;
// place-items: center;
`;

const MovieInfo = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
`;

export default MovieList;
