import firebase from 'firebase'
import uuid from 'uuid';

const GET_INIT_UPDATE_MOVIE_STATE = 'INIT_UPDATE_MOVIE_STATE';

export const initialMovieState = () => {
    return {
        type : GET_INIT_UPDATE_MOVIE_STATE
    }
}

const GET_UPDATE_MOVIE_VALIDATION_FAILED = 'GET_UPDATE_MOVIE_VALIDATION_FAILED';
const GET_UPDATE_MOVIE_REQUEST = 'GET_UPDATE_MOVIE_REQUEST';
const GET_UPDATE_MOVIE_SUCCESS = 'GET_UPDATE_MOVIE_SUCCESS';
const GET_UPDATE_MOVIE_FAILED = 'GET_UPDATE_MOVIE_FAILED';
const UPDATE_MOVIE_VALIDATION_FAILED = 'GET_UPDATE_MOVIE_VALIDATION_FAILED';
const UPDATE_MOVIE_REQUEST = 'UPDATE_MOVIE_REQUEST';
const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
const UPDATE_MOVIE_FAILED = 'UPDATE_MOVIE_FAILED';

export const updateMovieValidationFailed = (error) => {
    console.log(error.message)
    return {
        type: GET_UPDATE_MOVIE_VALIDATION_FAILED,
        payload: error.message
    }
}

function getupdateMovieRequest() {
    return {
        type: GET_UPDATE_MOVIE_REQUEST
    }
}

function getupdateMovieSuccess(doc) {
    return {
        type: GET_UPDATE_MOVIE_SUCCESS,
        payload : doc
    }
}
function getupdateMovieFailed(error) {
    return {
        type :GET_UPDATE_MOVIE_FAILED,
        payload : error
    }
}

function updateMovieRequest() {
    return {
        type: UPDATE_MOVIE_REQUEST
    }
}

function updateMovieSuccess(doc) {
    return {
        type: UPDATE_MOVIE_SUCCESS,
        payload : doc

    }
}
function updateMovieFailed(error) {
    return {
        type :UPDATE_MOVIE_FAILED,
        payload : error
    }
}

export function getUpdateMovie(id){
    return (dispatch,getState) =>{
        dispatch(getupdateMovieRequest());

        return (firebase.firestore().collection("movies").doc(id)
        .get())
        .then((doc)=>{
            if(doc.exists){
                console.log("doc");
                dispatch(getupdateMovieSuccess(doc));
            }else{
                dispatch(getupdateMovieFailed(new Error("movie is not found")))
            }
        }).catch((error)=>{
            dispatch(getupdateMovieFailed(error))
        })
    }
}

export function updateMovie(name,director,openedAt,description,file){
    return (dispatch,getState)  =>{
        dispatch(updateMovieRequest());
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
                    firebase.firestore().collection('movies').update({
                        name : name,
                        imageURL : downloadURL,
                        userId, userId,
                        director : director,
                        openedAt : openedAt,
                        description : description,
                        createdAt : new Date(),
                        updatedAt : new Date(),
                    }).then(()=>{
                        dispatch(updateMovieSuccess());
                    }).catch((error)=>{
                        dispatch(updateMovieFailed(error))
                    })
                })
        }else{
            firebase.firestore().collection('movies').update({
                name : name,
                director : director,
                openedAt : openedAt,
                description : description,
                createdAt : new Date(),
                updatedAt : new Date(),
            }).then(()=>{
                dispatch(updateMovieSuccess());
            }).catch((error)=>{
                dispatch(updateMovieFailed(error))
            })
        }
    }
}


const initialState = {
    isLoading : false,
    isSuccess : false,
    isFailed : false,
    error: null,
    doc : null
}

export default function updateMovieReducer(state = initialState, action) {
    switch (action.type) {
        case GET_UPDATE_MOVIE_VALIDATION_FAILED:
            return Object.assign({}, state, {
                error: action.payload
            })
            case UPDATE_MOVIE_REQUEST:
                return Object.assign({}, state, {
                    isLoading: true,
                    isSuccess: false,
                    isFailed: false,
                    error: null
                })
            case UPDATE_MOVIE_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: true,
                    isFailed: false,
                    error: null
                })
            case UPDATE_MOVIE_FAILED:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: false,
                    isFailed: true,
                    error: action.error
                })
                //
            case GET_UPDATE_MOVIE_REQUEST:
                return Object.assign({}, state, {
                    isLoading: true,
                    isSuccess: false,
                    isFailed: false,
                    error : null
                })
            case GET_UPDATE_MOVIE_SUCCESS:
                console.log(action);
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: true,
                    isFailed: false,
                    doc : action.payload,
                    error : null
                })
            case GET_UPDATE_MOVIE_FAILED:
                return Object.assign({}, state, {
                    isLoading: false,
                    isSuccess: false,
                    isFailed: true,
                    error: action.error
                })

            case GET_INIT_UPDATE_MOVIE_STATE:
                return Object.assign({},initialState);
        default:
            return state;
    }
}
