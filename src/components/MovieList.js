import React from 'react'
import '../netflix.css'
import noimage from '../noimage.png'

const checkPoster = poster =>{
    if(poster === null){
        return noimage
    }else{
        return 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'+ poster
    }
}

function MovieList({movielist,opendetail,videohandler}) {
    return (
        <div className="box">
          
            {console.log(movielist)}
           
            {
              
                movielist.map((movie,index)=>(
                  <a href="#" key={movie.id} className="button" onClick={()=>{
                      opendetail(movie.id) // get movie details
                      videohandler(movie.id) // get movie trailer youtube link
                  }}>
                  <img src={checkPoster(movie.poster_path)} alt="cover"/>
                  </a>
                ))
            }
            
            
        </div>
    )
}

export default MovieList
