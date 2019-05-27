import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { configureStore } from './store/index'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import { auth } from './store/authReducer'
var config = {
    apiKey: "AIzaSyAQx9uXlz0U9PPs3m17Dn_03c_rcTPiob4",
    authDomain: "react-board-86dfd.firebaseapp.com",
    databaseURL: "https://react-board-86dfd.firebaseio.com",
    projectId: "react-board-86dfd",
    storageBucket: "react-board-86dfd.appspot.com",
    messagingSenderId: "116879292413",
    appId: "1:116879292413:web:c91dbdf9dd924fc2"
};

firebase.initializeApp(config);

const store = configureStore();

store.dispatch(auth());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
