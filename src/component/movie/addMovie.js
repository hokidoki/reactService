import React, { Component } from 'react'
import { Grid, Form, Message, Header,Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMovieValidationFailed, addMovie,initialMovieState  } from '../../store/addMovieReducer'
import MovieForm from './MovieForm';

class AddMovie extends Component {
    componentDidMount(){
        this.props.initialMovieState();
    }
    onAddMovie = () => {
        const { name, director, openedAt, description,image} = this.refs.form.getValue();
        //유효성검사 
        if (!name) {
            this.props.addMovieValidationFailed(new Error("영화명을 적어주세요"));
            return;
        }
        if (!director) {
            this.props.addMovieValidationFailed(new Error("감독을 적어주세요"));
            return;
        }
        if (!openedAt) {
            this.props.addMovieValidationFailed(new Error("개봉일자를 적어주세요"));
            return;
        }
        if (!description) {
            this.props.addMovieValidationFailed(new Error("설명을 적어주세요"));
            return;
        }

        const file = image ? image.file : null;

        this.props.addMovie(name, director, openedAt, description,file);
    }
    render() {
        const { error, isLoading, isSuccess } = this.props;
        if (isSuccess) {
            return (
                <Grid.Row centered>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Header>영화등록완료</Header>
                        <Link to="/">영화 목록으로</Link>
                    </Grid.Column>
                </Grid.Row>
            )
        }
        return (
            <div>
                <MovieForm ref="form"/>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            {
                                error ? <Message content={error} /> : null
                            }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Button loading={isLoading} onClick={this.onAddMovie}> 영화 등록</Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.addMovie.error,
        isLoading: state.addMovie.isLoading,
        isSuccess: state.addMovie.isSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMovie: (name, director, openedAt, description,file) => dispatch(addMovie(name, director, openedAt, description,file)),
        addMovieValidationFailed: (error) => dispatch(addMovieValidationFailed(error)),
        initialMovieState : ()=> dispatch(initialMovieState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);


