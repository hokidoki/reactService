import React, { Component } from 'react';
import MovieList from '../../component/movie/movieList';


class HomePage extends Component {
    render(){
        return (
            <div>
                <MovieList/>
            </div>
          );
        }
    }

export default HomePage;
