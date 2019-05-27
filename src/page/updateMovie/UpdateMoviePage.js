import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import UpdateMovie from '../../component/movie/updateMovie'
import {getUpdateMovie} from '../../store/updateMovieReducer'
import {connect} from 'react-redux';

class UpdateMoviePage extends Component {


    componentDidMount(){
    //    console.log(this.props.getMovie(this.props.match.params.movieId));
    }
    
    
    render(){
        return(
            <Grid >
                <Grid.Column mobile={16} tablet={12} computer={10}>
                     <UpdateMovie/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default withRouter(UpdateMoviePage);