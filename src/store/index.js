import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import displayNameReducer from './displayNameReducer';
import logoutReducer from './logoutReducer'
import addMovieReducer from './addMovieReducer'
import movieListReducer from './movieListReducer'
import getMyMovieList from './myMovieReducer'
import updateMovieReducer from './updateMovieReducer'
//이제 state.auth.user로 사용해야한다. 
export function configureStore() {
    return createStore(
        combineReducers({
            auth: authReducer,
            signup: signupReducer,
            login: loginReducer,
            logout: logoutReducer,
            displayName : displayNameReducer,
            addMovie : addMovieReducer,
            movieList : movieListReducer,
            getMyMovieList : getMyMovieList,
            updateMovie : updateMovieReducer
        }),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            //이게 먼저 
        )
    )
}