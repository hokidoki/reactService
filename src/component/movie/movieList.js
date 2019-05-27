import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMovieList} from '../../store/movieListReducer'
import MovieItem from './movieItem'
import { Grid, Button, GridRow } from 'semantic-ui-react'


class MovieList extends Component {

    componentDidMount() {
        this.props.getMovieList(null);
    }
    onLoadMore = () =>{
        if(this.props.list.length){
            this.props.getMovieList(this.props.list[this.props.list.length -1]);
        } else
        this.props.getMovieList(null);
    }
    
    
    render(){
        const {list} = this.props;
        const items = list.map((item)=>{
            const {id} =item;
            const { name, opendAt,director,description,createdAt,imageURL} =item.data();
            console.log(createdAt);
            return (
                <Grid.Column key={id} mobile={8} tablet={5} computer={4}>
                <MovieItem name={name} opendAt={opendAt} director={director} description={description} imageURL={imageURL}likeCnt={0}/>
          </Grid.Column>
            )
          
        })
        return (
           
            <div>
                <Grid>
                    {items}
                    <GridRow centered>
                        <Button onClick={this.onLoadMore}>더 불러오기</Button>
                    </GridRow>
                </Grid>
            </div>
        )
    }
}

const mapStateToprops = (state) =>{
    return {
        isLoading : state.movieList.isLading,
        list : state.movieList.list,
        error : state.movieList.error
    }
}

const mapDipatchToProps = (dispatch) => {
    return {
        getMovieList : (last)=>dispatch(getMovieList(last))
    }
}

export default connect(mapStateToprops,mapDipatchToProps)(MovieList);