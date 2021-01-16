import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import './Loading.scss'

const Loading = () => {

    return (
        <div className='loading'>
           <h3>Loading</h3>
           <LinearProgress />
        </div>
    )
}
export default Loading