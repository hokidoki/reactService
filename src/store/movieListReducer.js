import firebase from 'firebase'

const GET_MOVIE_LIST_REQUEST = 'GET_MOVIE_LIST_REQUEST';
const GET_MOVIE_LIST_SUCCESS = 'GET_MOVIE_LIST_SUCCESS';
const GET_MOVIE_LIST_FAILED = 'GET_MOVIE_LIST_FAILED';

function getMovieListRequest() {
    return {
        type: GET_MOVIE_LIST_REQUEST
    }
}

function getMovieListSuccess(list,last) {
    return {
        type: GET_MOVIE_LIST_SUCCESS,
        payload: {
            list : list,
            last : last,
        }

    }
}

function getMovieListFailed(error) {
    return {
        type: GET_MOVIE_LIST_FAILED,
        payload: error
    }
}

export function getMovieList(last) {
    return (dispatch) => {
        dispatch(getMovieListRequest());
        let query = null;
        
        if(last){
            query= firebase.firestore().collection('movies').limit(10).orderBy('createdAt').startAfter(last).limit(3);
        }else{
            query= firebase.firestore().collection('movies').limit(10).orderBy('createdAt').limit(3);
        }

            query.get()
            .then((snapshop) => {
                dispatch(getMovieListSuccess(snapshop.docs, last));
            }).catch((error) => {
                dispatch(getMovieListFailed(error));
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

export default function movieListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIE_LIST_REQUEST:
            return Object.assign({}, state, {
                isloading: true,
                isSuccess: false,
                isFailed: false,
            })
        case GET_MOVIE_LIST_SUCCESS:
            return Object.assign({}, state, {
                isloading: false,
                isSuccess: true,
                isFailed: false,
                list : action.payload.last? [...state.list,...action.payload.list] : [...action.payload.list]
            })

        case GET_MOVIE_LIST_FAILED:
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