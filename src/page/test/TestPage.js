import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
// import MovieItem from '../../component/movie/movieItem'
import MovieList from '../../component/movie/movieList'

class TestPage extends Component {
    render() {
        return (
            <Grid>
                <MovieList/>
            </Grid>
        )
    }
}

export default TestPage;