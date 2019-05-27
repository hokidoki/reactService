import firebase from 'firebase';

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'LOGOUT_FAILED';

function logoutRequest() {
    return {
        type: LOGOUT_REQUEST
    }
}
function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}
function logoutFailed(error) {
    return {
        type: LOGOUT_FAILED,
        payload : error 
    }
}

export function logout(email, password) {
    return (dispatch) => {
        dispatch(logoutRequest());

        firebase.auth().signOut()
        .then(()=>{
            dispatch(logoutSuccess());
        })
        .catch(function(error) {
            console.log(error);
            dispatch(logoutFailed(error))
          });
        // firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        //     dispatch(logoutSuccess());
        // }).catch(function (error) {
        //     console.log(error)
        //     dispatch(logoutFailed());
        // });


    }
}

const initialState = {
    isLoding: false,
    isSuccess: false,
    isFailed: false,
    error : null
}

export default function logoutReducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isLoding: true,
                isSuccess: false,
                isFailed: false,
                error : null
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoding: false,
                isSuccess: true,
                isFailed: false,
                error : null
            })
        case LOGOUT_FAILED:
            const error = action.payload;
            return Object.assign({}, state, {
                isLoding: false,
                isSuccess: false,
                isFailed: true,
                error : error,
                

            })
        default:
            return state;
    }
}