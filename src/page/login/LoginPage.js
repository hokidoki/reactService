import React, { Component } from 'react'
import LoginForm from '../../component/login/LoginForm'
import { Grid } from 'semantic-ui-react'

class LoginPage extends Component {
    render(){
        return (
            <div >
                       <Grid >
                    <Grid.Row centered>
                        {/* <GridColumn width={4}/> */}
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <LoginForm />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
          );
    }
}

export default LoginPage;
