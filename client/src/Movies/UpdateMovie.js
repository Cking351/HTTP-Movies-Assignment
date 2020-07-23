import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialItem = {
    title: '',
    director: '',
    metascore: ''
}


const UpdateMovie = props => {
    const location = useLocation();
    const { id } = useParams();
    const { push } = useHistory();

    // string value state
    const [movie, setMovie] = useState(initialItem);
    

    useEffect(() => {
        if(location.state){
            setMovie(location.state)
        }else{
            axios
                .get(`http://localhost:5000/api/movies/${id}`)
                .then(res => setMovie(res.data))        
                .catch(err => console.log(err))
        }
    },[])

    const changeHandler = event => { // this is for string values
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

   

    const handleSubmit = event => {
        event.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovie(initialItem)
                push(`/movies/${id}`)
                window.location.reload()
            })
            .catch(error => console.log(error))
    }


    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder='Title'
                value={movie.title}
                />
                <input 
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='Director'
                value={movie.director}
                />
                <input 
                type='text'
                name='metascore'
                onChange={changeHandler}
                placeholder='MetaScore'
                value={movie.metascore}
                />
                <button type='submit'>Submit Changes</button>
            </form>
        </div>
    )
}


export default UpdateMovie;