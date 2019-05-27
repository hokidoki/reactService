import firebase from 'firebase';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGIN_VALIDATION_FAILED = "LOGIN_VALIDATION_FAILED";

function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}
function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}
function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        payload : error 
    }
}

export function login(email, password) {
    return (dispatch) => {
        dispatch(loginRequest());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            dispatch(loginSuccess());
        })
        .catch(function(error) {
            console.log(error);
            dispatch(loginFailed(error))
          });
        // firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        //     dispatch(loginSuccess());
        // }).catch(function (error) {
        //     console.log(error)
        //     dispatch(loginFailed());
        // });


    }
}

export function loginValidationFaild(error){
    return {
        type : LOGIN_VALIDATION_FAILED,
        payload : error
    }
}

const initialState = {
    isLoding: false,
    isSuccess: false,
    isFailed: false,
    error : null
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isLoding: true,
                isSuccess: false,
                isFailed: false,
                error : null
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoding: false,
                isSuccess: true,
                isFailed: false,
                error : null
            })
        case LOGIN_FAILED:
            const error = action.payload;
            return Object.assign({}, state, {
                isLoding: false,
                isSuccess: false,
                isFailed: true,
                error : error,
            })
        case LOGIN_VALIDATION_FAILED:
            return Object.assign({},state,{
                error : action.payload
            })
        default:
            return state;
    }
}