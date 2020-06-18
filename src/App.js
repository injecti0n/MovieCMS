import Search from './Search'
import React, { useState } from 'react'
import axios from 'axios'
import MovieDetail from './components/MovieDetail'

function App() {

  const [state, setState] = useState({
    inputvalue: "",
    results: [],
    selected: {

    },
    trailer: []

  })


  const apiurl = "https://api.themoviedb.org/3/search/movie?api_key=07a61de5b731a869bc9cec8e25d2c8a8&query="


  const handleInput = (e) => {
    let inputValue = e.target.value;
    setState(prevState => {
      return { ...prevState, inputvalue: inputValue }
    })
    console.log(state.inputvalue)
  }

  const openDetail = id => {
    const api = `https://api.themoviedb.org/3/movie/${id}?api_key=07a61de5b731a869bc9cec8e25d2c8a8`
    axios(api).then(res => res).then(data => {
      setState(prevState => {
        return {
          ...prevState, selected: data.data
        }
      })
    })
  }

  // youtube links
  // https://api.themoviedb.org/3/movie/272/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8

  // single movie detail
  // https://api.themoviedb.org/3/movie/${id}?api_key=07a61de5b731a869bc9cec8e25d2c8a8

  // list of movies 
  // https://api.themoviedb.org/3/search/movie?api_key=07a61de5b731a869bc9cec8e25d2c8a8&query=
  

  // fetching youtube link of movie trailer
  let showTrailer = (id) => {
    axios('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8')
    .then(res=>res)
    .then(data=>{
      if(data.data.results.length ===0){
        setState(prevState=>{
          return{
            ...prevState, trailer: 'https://www.youtube.com/watch?v=tvJTFMQei4g'
          }
        })
      }else{
        setState(prevState=>{
          return{
            ...prevState, trailer: 'https://www.youtube.com/watch?v='+ data.data.results[0].key
          }
        })
      }
    })
  }

  // exit modal exit component
  const exitButton = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    })
  }


  // fetching list of movies
  const search = e => {
    // console.log(e.key)
    if (e.key === "Enter") {
      console.log('enter keypress')
      axios(apiurl + state.inputvalue)
        .then(response => response)
        .then(data => {
          //  console.log(data)
          let listofmovies = data.data.results
          //console.log(listofmovies)
          setState(prevState => {
            return {
              ...prevState, results: listofmovies
            }
          })

        })
    }



  }




  return (
    <div className="App">
      <header>
        <h1>Movie CMS</h1>
      </header>
      <main>
        <Search handleInput={handleInput} movielist={state.results} moviesearch={search} opendetail={openDetail} videohandler={showTrailer} selectedmovie={state.selected} />
        {/* <MovieDetail selected={state.selected}/> */}
        {console.log('selected', (typeof state.selected.original_title) != 'string' ? false : true)}
        {
          (typeof state.selected.original_title != 'string') ? false : <MovieDetail selected={state.selected} trailer={state.trailer} exitbutton={exitButton} />
        }
      </main>
    </div>
  )
}

export default App
