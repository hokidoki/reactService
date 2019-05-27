import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import AddMovie from '../../component/movie/addMovie'

class AddMoviePage extends Component {
    render(){
        return(
            <Grid >
                <Grid.Column mobile={16} tablet={12} computer={10}>
                     <AddMovie/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default AddMoviePage