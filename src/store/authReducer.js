//state에 유저정보를 추가하는 리듀서 

import firebase from 'firebase'

const UPDATE_USER = "UPDATE_USER";
export const updateUser = (firebaseUser) => {
    const newUser = firebaseUser ? new User(firebaseUser) : null;
    return {
        type : UPDATE_USER,
        payload : newUser,
    }
}

//좀더 개선
class User {
    constructor(firebaseUser){
        this.display= firebaseUser.displayName;
        this.email= firebaseUser.email;
        this.emailVerified= firebaseUser.emailVerified;
        this.photoURL= firebaseUser.photoURL;
        this.isAnonymous= firebaseUser.isAnonymous;
        this.uid= firebaseUser.uid;
        this.providerData= firebaseUser.providerData;
    }
}

export const auth = () => {
        return (dispatch) => {
            firebase.auth().onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                dispatch(updateUser(firebaseUser));
            } else {
                dispatch(updateUser(null));
            }
        }
    )
}
}

const initialState = {
    user: null,
}



export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER : 
            return Object.assign({},state,{
                user : action.payload
            })
        default:
            return state;
        }
    }

