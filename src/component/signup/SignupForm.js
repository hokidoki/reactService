import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react'
import { signup, signupValidationFailed} from '../../store/signupReducer'

class SignupForm extends Component {
    state = {
        email : '',
        password : '',
        password2 : '',
        terms : false,
        message : '',
    }
    onHandleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onCheckboxHandleChange=(e)=>{
        this.setState({
            terms : !this.state.terms
        })
        console.log(this.state.terms); 
    }

    onSignup = (e) =>{
        // 이메일은 입력했는지
        // 비밀번호는 입력했는지
        //패스워드 벨리데이션
        // 서비스 이용약관은 눌렀는지 

        const {
            email,
            password,
            password2,
            terms,
            
        } = this.state;

        if(!email){
           this.props.signupValidationFailed(new Error("이메일을 입력해주세요"));
            return; 
        }
        if(!password){
            this.props.signupValidationFailed(new Error("패스워드를 입력해주세요."))
            return; 
        }
        if(password !== password2){
            this.props.signupValidationFailed(new Error("패스워드가 다릅니다."))
            return; 
        }
        if(!terms){
            this.props.signupValidationFailed(new Error("서비스 이용약관에 동의해주세요"))
            return; 
        }
        this.props.signup(email,password);
    }
    render() {

        const{ isLoding,error } = this.props;  
        const { email, password , password2, terms} = this.state;
        return (
            <div >
                <Form>
                    <Form.Field>
                        <label>E-mail</label>
                        <input name="email" placeholder='E-mail' value={email} onChange={this.onHandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" type="password" placeholder='Password' value={password} onChange={this.onHandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password for validation</label>
                        <input name="password2" type="password" placeholder='Password' value={password2} onChange={this.onHandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <Checkbox name="terms" label='서비스 이용약관' checked={terms} onChange={this.onCheckboxHandleChange}/>
                    </Form.Field>
                    <Button type='submit' loading={isLoding} onClick={this.onSignup}>Submit</Button>
                    
                </Form>

                {
                    //메세지가 참일때는 message가 나옴 , 아닐때는 널
                    error? 
                    
                    <Message>
                    <p> 
                        {error.message}
                    </p>
                     </Message>: null
                }
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        isLoding : state.signup.isLoding,
        error : state.signup.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signup : (email,password)=>dispatch(signup(email, password)),
        signupValidationFailed : (error)=>dispatch(signupValidationFailed(error))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignupForm);
