import React from 'react'
import './searchBar.scss'
import SearchIcon from '@material-ui/icons/Search'


const SearchBar = ({onSearchChange, onSearchSubmit}) => {


    return (
    
        <div className='searchInput'>
           <SearchIcon onClick={onSearchSubmit} className='searchIcon'/>
           <input placeholder='search movie by title' onChange={onSearchChange}/>
         
        </div>
    )
}


export default SearchBar;