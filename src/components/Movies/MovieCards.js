
import React from 'react'
import './Moviecards.scss'
import { Button } from '@material-ui/core';



const DEFAULT_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Moviecard = ({ Title, Year, Poster, nominateMovie, imdbID,
  nominees }) => {


  const movieImage =
    Poster === "N/A" ? DEFAULT_IMAGE : Poster;
  const checkIfNominated = nominees.find(nominee => nominee.imdbID === imdbID)



  return (
    <div className='col-lg-3 col-6'>
      <div className=' movie mt-auto my-auto'>
        <img
          src={movieImage}
          alt='movie poster'
        />
        <div className='movieDetails  row mt-3'>
          <div className='col-lg-6 movieDetailsText'>
            <span>{Title}</span><p>{Year}</p>
          </div>
          {checkIfNominated ? <Button disabled className='nominated-button'>Nominated</Button> :
            <Button onClick={() => {
              nominateMovie(Title, Year, Poster, imdbID)
            }}>Nominate</Button>
          }
        </div>
      </div>
    </div>
  );
};

export default Moviecard