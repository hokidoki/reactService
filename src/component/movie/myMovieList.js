import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getMyMovieList} from '../../store/myMovieReducer'
import { Grid, Button, GridRow } from 'semantic-ui-react'
import MyMovieItem from './myMovieItem'

class MyMovieList extends Component {

    componentDidMount() {
        this.props.getMyMovieList(null);
    }
    onLoadMore = () =>{
        if(this.props.list.length){
            this.props.getMyMovieList(this.props.list[this.props.list.length -1]);
        } else
        this.props.getMyMovieList(null);
    }
    onItemClick = (id) =>{
        console.log("onitemclcik", id);
        this.props.history.push(`/movie/${id}/update`)
    }
    
    render(){
        const {list} = this.props;
        const items = list.map((item)=>{
            const {id} =item;
            const { name, opendAt,director,description,imageURL} =item.data();
            return (
                <Grid.Column key={id} mobile={8} tablet={5} computer={4}>
                <MyMovieItem id={id} onClick={this.onItemClick}name={name} opendAt={opendAt} director={director} description={description} imageURL={imageURL}likeCnt={0}/>
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
        isLoading : state.getMyMovieList.isLading,
        list : state.getMyMovieList.list,
        error : state.getMyMovieList.error
    }
}

const mapDipatchToProps = (dispatch) => {
    return {
        getMyMovieList : (last)=>dispatch(getMyMovieList(last))
    }
}

export default connect(mapStateToprops,mapDipatchToProps)(withRouter(MyMovieList));