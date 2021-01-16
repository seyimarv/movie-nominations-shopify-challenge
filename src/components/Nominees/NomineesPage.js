import React from 'react'
import NomineeCard from './Nominees'
import FlipMove from "react-flip-move";


const NomineesPage = ({ nominees, removeMovie }) => {
  return (

    <div className='content-two'>
      <div className='
          '>
        <FlipMove>
          {
            nominees.map(({ Poster, Title, Year, imdbID }) =>

              <NomineeCard Poster={Poster} key={imdbID}
                Title={Title} removeMovie={removeMovie}
                Year={Year} imdbID={imdbID} />

            )
          }
        </FlipMove>
      </div>
    </div>

  )
}

export default NomineesPage