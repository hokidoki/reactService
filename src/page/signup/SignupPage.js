import React, { Component } from 'react';
import SignupForm from '../../component/signup/SignupForm'

import { Grid, GridColumn, GridRow } from 'semantic-ui-react';

//semantic-ui의 그리드는 16줄이다. 
class SignupPage extends Component {
    render() {
        return (
            <div >
                <Grid >
                    <GridRow centered>
                        {/* <GridColumn width={4}/> */}
                        <GridColumn mobile={16} tablet={8} computer={6}>
                            <SignupForm />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        );
    }
}

export default SignupPage;
