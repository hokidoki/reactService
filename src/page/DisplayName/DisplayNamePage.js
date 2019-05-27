import React, {Component} from 'react'
import {Grid, GridColumn } from 'semantic-ui-react'
import DisplayName from '../../component/displayName/displayNameForm'

class DisplayNamePage extends Component {
    render(){
        return (
            <Grid centered>
                <GridColumn  mobile={15} tablet={6} computer={6}>
                    <DisplayName/>
                </GridColumn>
            </Grid>
        )
    }
}

export default DisplayNamePage