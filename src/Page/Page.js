import React, { useEffect, useState } from 'react'
import './page.scss';
import Moviecard from '../components/Movies/MovieCards';
import SearchBar from '../components/Searchbar/Searchbar';
import { useAlert } from "react-alert";
import Badge from '../badge-1361.svg'
import NomineesPage from '../components/Nominees/NomineesPage';
import Loading from '../components/Loading/Loading'

const Page = () => {
    const [searchResult, setSearchResult] = useState([])
    const [searchField, setSearchField] = useState('')
    const [nominees, setNominees] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const Alert = useAlert()




    const url = "https://www.omdbapi.com/?s=man&apikey=18fd42e6"
    const fetchedNominees = JSON.parse(localStorage.getItem('nominees'))
    useEffect(() => {

        fetch(url)
            .then(response => response.json())
            .then(jsonResponse => {
                setSearchResult(jsonResponse.Search);
                console.log(searchResult)

            });

        if (fetchedNominees) {
            setNominees(fetchedNominees)
        }
        setLoading(false)
    }, [])

    const checkIfNominationsCompleted = () => {
        if (nominees.length === 4) {
            Alert.success('Nominations complete! and you just won a badge!')
        }
    }



    const nominateMovie = async (Title, Year, Poster, imdbID) => {
        try {
        if (nominees.length < 5) {

            const movie = { Title, Year, Poster, imdbID }
            const newNominees = [...nominees, movie]
            await setNominees(newNominees)
            checkIfNominationsCompleted()
            localStorage.setItem('nominees', JSON.stringify(newNominees))
            Alert.success('movie added to nominations')
        } else {
            Alert.info('you can only nominate five movies')
        }
    } catch(err) {
        Alert.failure('An error occured')
    }



    }

    const removeMovie = async (imdbID) => {
    try {
        const Nominated = nominees.filter(
            (nominee) => nominee.imdbID !== imdbID
        );
        await setNominees(Nominated)

        localStorage.setItem('nominees', JSON.stringify(Nominated))
        Alert.success('movie removed from nominations')
      } catch(err) {
          Alert.failure('An error occured')
      }
    }





    const searchFunc = (searchInput) => {
        setLoading(true)
        const url = `https://www.omdbapi.com/?s=${searchInput}&apikey=18fd42e6`
        fetch(url)
            .then(response => response.json())
            .then(jsonResponse => {
                setSearchResult(jsonResponse.Search);
                console.log(searchResult)
            });
        console.log(searchField)
        setLoading(false)
    }


    const onSearchChange = e => {
        setSearchField(e.target.value)
    }


    const onSearchSubmit = e => {
        e.preventDefault()
        searchFunc(searchField)
    }





    return (
        <div className='container-fluid'>
            <div className='header row sticky-top'>
                <div className='col-lg-3 py-1'>
                   <div className='d-flex'>
                    <h4 className='shoppies-text'>Shoppies</h4>
                    <div className='show-nominee row'>
                      { !open ?
                        <h3 className='' onClick={handleOpen}><i className="dropdown-toggle mt-2" id="dropdownMenuButton" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </i>{nominees.length} Nominees</h3> :
                        <h3 onClick={handleClose} className='dropup'><i className="dropdown-toggle mt-2" id="dropdownMenuButton" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>{nominees.length} Nominees</h3>
                      }
                        {nominees.length === 5 ?
                            <img src={Badge} 
                                alt='nominations complete badge'
                            />

                            : null
                        }
                    </div>
                    </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                    <SearchBar onSearchChange={onSearchChange}
                        onSearchSubmit={onSearchSubmit} />
                </div>
                <div className='col-lg-3 mr-2 row nominations-text'>
                    <h3 className='nominations-text'>{nominees.length} Nominations</h3>
                    {nominees.length === 5 ?
                        <img src={Badge} 
                             alt='nominations complete badge'
                        />

                        : null
                    }
                </div>
            </div>

            <div className='row pt-3 body'>


                {loading ? <Loading /> :
                    <div className='col-lg-9'>
                        {nominees.length < 5 ?
                            <h3 className='nomination-info'>Search omdb Movies and Nominate up to five of your favorites </h3>
                            : <h3 className='nomination-info'>Nominations Complete</h3>
                        }
                        <div className='w-100'>
                                { open ?
                                    <NomineesPage nominees={nominees} removeMovie={removeMovie}/> : null
                                }
                         </div>
                                         

                        {searchResult ?
                            <div className='content row'>
           {
                                    searchResult.map(({ Poster, movie, Title, Year, imdbID }) =>
                                        <Moviecard key={imdbID} Poster={Poster}
                                            movie={movie} Title={Title}
                                            Year={Year} imdbID={imdbID}
                                            className='pb-3' nominees={nominees}
                                            nominateMovie={nominateMovie} removeMovie={removeMovie} />
                                    )
                                }
                            </div> : <h1>{`No results for your search, try searching for another movie`}</h1>
                        }

                    </div>
                }

              
            
                  
                <div className='col-lg-3 nominee-content'>
                    <NomineesPage nominees={nominees} removeMovie={removeMovie} />


                </div>


            </div>
        </div>
    );
}

export default Page;
