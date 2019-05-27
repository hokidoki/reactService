import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { updateDisplayName, DisplayValidationFailed } from '../../store/displayNameReducer'

class DisplayNameForm extends Component {

    state = {
        displayName: ""
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUpdateDisplayName = (e) => {
        const {
            displayName
        } = this.state;

        if (!displayName) {
            this.props.DisplayValidationFailed(new Error('입력하세요'))
            return;
        }
        this.props.updateDisplayName(displayName)
    }

    render() {
        const { displayName } = this.state;
        const { isLoding, error } = this.props;
        return (
            <Form>
                <Form.Field>
                    <label>닉네임</label>
                    <input name="displayName" placeholder='nick-name' value={displayName} onChange={this.onHandleChange} />
                </Form.Field>
                <Button type='submit' loading={isLoding} onClick={this.onUpdateDisplayName}>닉네임 등록</Button>

                {error ? <Message contents={error.message}></Message> : null}
            </Form>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        isLoading : state.displayName.isLoading,
        error : state.displayName.error
    }   
}

const mapDispatchToProps = (dispatch ) =>{
    return {
        dispatchNameValidationFailed : (error) => dispatch(DisplayValidationFailed(error)),
        updateDisplayName : (displayName) => dispatch(updateDisplayName(displayName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DisplayNameForm);