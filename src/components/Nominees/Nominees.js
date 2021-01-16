import React, { forwardRef } from 'react'
import { Button } from '@material-ui/core';
import './Nominees.scss'






const DEFAULT_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const NomineeCard = forwardRef(({ Title, Year, Poster, removeMovie, imdbID }, ref) => {

  const movieImage =
    Poster === "N/A" ? DEFAULT_IMAGE : Poster;



  return (
    <div ref={ref}>
      <div className='nominee row'>
        <div className='col-4'>
          <img
            src={movieImage}
            alt='nominee poster'


          />
        </div>
        <div className='col-2'></div>
        <div className='details col-6'>
          <span>{Title}</span><p>{Year}</p>
          <Button onClick={() => {
            removeMovie(imdbID)
          }}>Remove</Button>
        </div>
      </div>

    </div>
  );
});

export default NomineeCard