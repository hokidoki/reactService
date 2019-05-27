import firebase from 'firebase'
import uuid from 'uuid';

const INIT_ADD_MOVIE_STATE = 'INIT_ADD_MOVIE_STATE';

export const initialMovieState = () => {
    return {
        type : INIT_ADD_MOVIE_STATE
    }
}

const ADD_MOVIE_VALIDATION_FAILED = 'ADD_MOVIE_VALIDATION_FAILED';
const ADD_MOVIE_REQUEST = 'ADD_MOVIE_REQUEST';
const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS';
const ADD_MOVIE_FAILED = 'ADD_MOVIE_FAILED';

export const addMovieValidationFailed = (error) => {
    console.log(error.message)
    return {
        type: ADD_MOVIE_VALIDATION_FAILED,
        payload: error.message
    }
}

function addMovieRequest() {
    return {
        type: ADD_MOVIE_REQUEST
    }
}

function addMovieSuccess() {
    return {
        type: ADD_MOVIE_SUCCESS

    }
}
function addMovieFailed(error) {
    return {
        type :ADD_MOVIE_FAILED,
        payload : error
    }
}

export function addMovie(name,director,openedAt,description,file){
    return (dispatch,getState)  =>{
        dispatch(addMovieRequest());
        //이미지는 이미지스토어에
        //데이터는 데이터베이스에 


        //아이디를 가져오기 위한 첫번째 방법

        // 게시글의 소유주를 등록하기 위해서 유저아이디를 가져왔다. 
        // const userId = firebase.auth().currentUser.uid;

        // 두 번째 방법 redux-state에서 가져오는 방법 ,첫번째 파라미터로 디스패치 , 두번째 겟 스테이트 함수 가 있다. 
        const userId = getState().auth.user.uid

        if(file){
            //이미지 저장하고 이미지 다운로드 url 가지고 왓
            //데이터 베이스에 같이 저장 . 
            //images/filename.jpg
            const filename = uuid.v1();
            const extension = file.name.split('.').pop();
            const url = `movies/${filename}.${extension}`;
            const movieRef = firebase.storage().ref().child(url);
            movieRef.put(file)
                .then((snapshot)=>{
                    return snapshot.ref.getDownloadURL();
                }).then((downloadURL)=>{
                    firebase.firestore().collection('movies').add({
                        name : name,
                        imageURL : downloadURL,
                        userId, userId,
                        director : director,
                        openedAt : openedAt,
                        description : description,
                        createdAt : new Date(),
                        updatedAt : new Date(),
                    }).then(()=>{
                        dispatch(addMovieSuccess());
                    }).catch((error)=>{
                        dispatch(addMovieFailed(error))
                    })
                })
        }else{
            firebase.firestore().collection('movies').add({
                name : name,
                director : director,
                openedAt : openedAt,
                description : description,
                createdAt : new Date(),
                updatedAt : new Date(),
            }).then(()=>{
                dispatch(addMovieSuccess());
            }).catch((error)=>{
                dispatch(addMovieFailed(error))
            })
        }
    }
}
const initialState = {
    isLoading : false,
    isSuccess : false,
    isFailed : false,
    error: null,
}

export default function addMovieReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MOVIE_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload
            })
            case ADD_MOVIE_REQUEST:
                return Object.assign({}, state, {
                    isLoading: true,
                    isSuccess: false,
                    isFailed: false,
                    error: null
                })
            case ADD_MOVIE_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: true,
                    isFailed: false,
                    error: null
                })
            case ADD_MOVIE_FAILED:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: false,
                    isFailed: true,
                    error: action.error
                })
            case INIT_ADD_MOVIE_STATE:
                return Object.assign({},initialState);
        default:
            return state;
    }
}
