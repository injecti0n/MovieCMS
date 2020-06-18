import React from 'react'
import '../detail.css'
import Stars from 'simple-rating-stars';
import ReactPlayer from 'react-player'
const SomeStars = (vote) => (

    <Stars
        stars={Math.round(vote) - 5}
        outOf={5}
        full={'#d00'}
        empty={'#E1F1FF'}
        stroke={'#fff'}
    />
);

let getCategories = (cat) => {
    let categories = []
    cat.genres.forEach(genre => {
        categories.push(genre.name)
    })
    return categories.toString()
}

function MovieDetail({ selected, exitbutton, trailer }) {

    return (
        <div className="detail">
            <div className="movie-card">

                <div className="container">

                    <a href="#"><img src={'https://image.tmdb.org/t/p/w220_and_h330_face' + selected.poster_path} alt="cover" className="cover" /></a>

                    <div className="hero" style={{ backgroundImage: `url(${'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + selected.poster_path})` }}>

                        <div className="details">

                            <div className="title1">{selected.original_title} <span>({selected.original_language.toUpperCase()})</span></div>

                            <div className="title2">Categories: {getCategories(selected)}</div>

                            <fieldset className="rating">

                                {SomeStars(selected.vote_average)}
                            </fieldset>

                            <span className="likes">{selected.vote_count} likes</span>

                        </div>

                    </div>

                    <div className="description">

                        <div className="column2">

                            <p>{selected.overview}</p>

                        </div>
                        <div className="column3">
                            <h3>Trailer:</h3>
                            {console.log(trailer)}
                            <ReactPlayer width="100%" height="200px" url={trailer} playing />
                        </div>
                    </div>
                    <a href="#" onClick={() => exitbutton()} className="close" />

                </div>

            </div>
        </div>


    )
}

export default MovieDetail
