import firebase from 'firebase';
import { updateUser } from './authReducer'

const UPDATE_DISPLAY_NAME_REQUEST = 'UPDATE_DISPLAY_NAME_REQUEST';
const UPDATE_DISPLAY_NAME_SUCCESS = 'UPDATE_DISPLAY_NAME_SUCCESS';
const UPDATE_DISPLAY_NAME_FAILED = 'UPDATE_DISPLAY_NAME_FAILED';

const DISPLAY_VALIDATION_FAILED = 'DISPLAY_VALIDATION_FAILED';

function updateDisplayNameRequest() {
    return {
        type: UPDATE_DISPLAY_NAME_REQUEST
    }
}
function updateDisplayNameSuccess() {
    return {
        type: UPDATE_DISPLAY_NAME_SUCCESS
    }
}

function updateDisplayNameFailed(error) {
    return {
        type: UPDATE_DISPLAY_NAME_FAILED,
        error: error
    }
}

export function DisplayValidationFailed(error) {
    return {
        type: DISPLAY_VALIDATION_FAILED,
        error: error
    }
}

export function updateDisplayName(displayName) {
    return (dispatch) => {
        dispatch(updateDisplayNameRequest());
        const user = firebase.auth().currentUser;

        if (user) {
            user.updateProfile({
                displayName: displayName
            }).then(() => {
                dispatch(updateDisplayNameSuccess())
                dispatch(updateUser(firebase.auth().currentUser))
            }).catch((error) => {
                dispatch(updateDisplayNameFailed(error))
            })
        } else {
            dispatch(updateDisplayNameFailed(new Error("user is not logined")));
        }
    }
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null
}

export default function displayNameUpdate(state = initialState, action) {

    switch (action.type) {
        case UPDATE_DISPLAY_NAME_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                isSuccess: false,
                isFailed: false,
                error: null
            })
        case UPDATE_DISPLAY_NAME_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: true,
                isFailed: false,
                error: null
            })
        case UPDATE_DISPLAY_NAME_FAILED:
            
            return Object.assign({}, state, {
                isLoading: false,
                isSuccess: false,
                isFailed: true,
                error: action.error
            })
        case DISPLAY_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.error
            })
        default:
            return state
    }
}