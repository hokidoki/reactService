import firebase from 'firebase'

const GET_MY_MOVIE_LIST_REQUEST = 'GET_MY_MOVIE_LIST_REQUEST';
const GET_MY_MOVIE_LIST_SUCCESS = 'GET_MY_MOVIE_LIST_SUCCESS';
const GET_MY_MOVIE_LIST_FAILED = 'GET_MY_MOVIE_LIST_FAILED';

function getMyMovieListRequest() {
    return {
        type: GET_MY_MOVIE_LIST_REQUEST
    }
}

function getMyMovieListSuccess(list,last) {
    return {
        type: GET_MY_MOVIE_LIST_SUCCESS,
        payload: {
            list : list,
            last : last,
        }

    }
}

function getMyMovieListFailed(error) {
    return {
        type: GET_MY_MOVIE_LIST_FAILED,
        payload: error
    }
}

export function getMyMovieList(last) {
    return (dispatch,getState) => {
        dispatch(getMyMovieListRequest());
        let query = null;
        if(last){
            query= firebase.firestore().collection('movies').where("userId","==",getState().auth.user.uid).limit(10).orderBy('createdAt').startAfter(last).limit(3);
        }else{
            query= firebase.firestore().collection('movies').limit(10).orderBy('createdAt').where("userId","==",getState().auth.user.uid).limit(3);
        }

            query.get()
            .then((snapshop) => {
                dispatch(getMyMovieListSuccess(snapshop.docs, last));
            }).catch((error) => {
                console.log(error);
                dispatch(getMyMovieListFailed(error));
            })
    }
}

const initialState = {
    list: [],
    isloading: false,
    isSuccess: false,
    isFailed: false,
    error: null
}

export default function myMovieListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MY_MOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isloading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_MY_MOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isloading: false,
                isSuccess: true,
                isFailed: false,
                list : action.payload.last? [...state.list,...action.payload.list] : [...action.payload.list]
            })

        case GET_MY_MOVIE_LIST_FAILED:
            return Object.assign({}, state, {
                isloading: false,
                isSuccess: false,
                isFailed: true,
                error : action.payload
            })
        default : 
            return state;
    }
}