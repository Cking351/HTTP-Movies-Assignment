import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialItem = {
    title: '',
    director: '',
    metascore: '',
}


const UpdateMovie = () => {
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();

    // string value state
    const [movie, setMovie] = useState(initialItem);
    

    useEffect(() => {
         axios.get(`http://localhost:5000/api/movies/${params.id}`)
          .then(res => {
              setMovie(res.data)
          })
          .catch(err => console.log(err))
    })

    const changeFormHandler = event => { // this is for string values
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

   

    const handleSubmit = event => { 
        event.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => console.log(res))
    }
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='title'
                onChange={changeFormHandler}
                placeholder='Title'
                value={movie.name}
                />
                <input 
                type='text'
                name='director'
                onChange={changeFormHandler}
                placeholder='Director'
                value={movie.director}
                />
                <input 
                type='text'
                name='metascore'
                onChange={changeFormHandler}
                placeholder='MetaScore'
                value={movie.metascore}
                />
                <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie;