import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react'
import { Button, Form } from 'semantic-ui-react'
import {login, loginValidationFaild} from '../../store/loginReducer'


class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }
    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //프롭스를 스테이트로 
   
    

    onLogin = (e) => {
        const {
            email,
            password,
            
        } = this.state;

        if (!email) {
            this.props.loginValidationFaild(new Error("이메일을 입력하세요"));
            return;
        }
        if (!password) {
            this.props.loginValidationFaild(new Error("비밀번호를 입력하세요."));
            return;
        }
        this.props.login(email,password);
    }
    render() {

        const { isLoding ,error } = this.props
        const { email, password} = this.state
        return (
            <div >
                <Form>
                    <Form.Field>
                        <label>E-mail</label>
                        <input name="email" placeholder='E-mail' value={email} onChange={this.onHandleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" type="password" placeholder='Password' value={password} onChange={this.onHandleChange} />
                    </Form.Field>
                    <Form.Field>

                    </Form.Field>
                    <Button type='submit' loading={isLoding} onClick={this.onLogin}>로그인</Button>

                </Form>

                {
                    //메세지가 참일때는 message가 나옴 , 아닐때는 널
                    error ? <Message><p> {error.message}</p></Message> : null
                }
                {/* {
                    
                    error ? <Message content={message}></Message>: null
                } */}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoding : state.login.isLoding,
        error : state.login.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login  : (email,password) =>dispatch(login(email,password)),
        loginValidationFaild : (error) => dispatch(loginValidationFaild(error))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
