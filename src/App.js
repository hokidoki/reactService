import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import HomePage from './page/home/HomePage'
import LoginPage from './page/login/LoginPage'
import SignupPage from './page/signup/SignupPage'

import Header from './component/header/Header'

import { connect } from 'react-redux';

import DisplayNamePage from './page/DisplayName/DisplayNamePage';

import AddMoviePage from './page/addMovie/addMoviePage'

import TestPage from './page/test/TestPage';

import MyMoviePage from './page/myMovieList/myMovieListPage'

import UpdateMoviePage from './page/updateMovie/UpdateMoviePage'

class App extends Component {

  render() {
    return (
      <div >
        <Router>
          <Header />
          <Route path="/" exact component={() => {
            if (this.props.user && this.props.user.display) {
              return <HomePage />
            } else if (this.props.user) {
              return <Redirect to="/display-name" />
            } else {
              return <Redirect to="/login" />
            }
          }} />

          <Route path="/my-movies" exact component={() => {
            if (this.props.user && this.props.user.display) {
              return <MyMoviePage />
            } else if (this.props.user) {
              return <Redirect to="/display-name" />
            } else {
              return <Redirect to="/login" />
            }
          }} />
          <Route path="/movie/add" component={AddMoviePage} />
          {/* /movie/어떠한 값/update 를 하면 다 넘어감  */}
          <Route path="/movie/:movieId/update" component={UpdateMoviePage} />

          <Route path="/login" component={() => {
            if (this.props.user) {
              return <Redirect to="/" />
            } else {
              return <LoginPage />
            }
          }} />
          <Route path="/signup" component={() => {
            if (this.props.user) {
              return <Redirect to="/" />
            } else {
              return <SignupPage />
            }
          }} />
          <Route path="/display-name" component={() => {
            if (this.props.user && this.props.user.display) {
              return <Redirect to="/" />
            } else if (this.props.user) {
              return <DisplayNamePage />
            } else {
              return <Redirect to="/login" />
            }
          }} />
          <Route path="/test" component={TestPage} />
        </Router>
      </div>
    );
  }
}
//스테이트 값이 props로 전달됨 state가 변환할때 마다 전달 받을거임 
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(App);
