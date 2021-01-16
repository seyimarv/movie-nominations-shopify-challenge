import React from 'react'
import './searchbar.scss'
import SearchIcon from '@material-ui/icons/Search'


const SearchBar = ({onSearchChange, onSearchSubmit}) => {
   const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            onSearchSubmit(e)
        }
      }
    return (
        <div className='searchInput'>
           <SearchIcon onClick={onSearchSubmit} className='searchIcon'/>
           <input placeholder='Search movie by title' onKeyPress={handleKeyPress} onChange={onSearchChange}/>
         
        </div>
    )
}


export default SearchBar;