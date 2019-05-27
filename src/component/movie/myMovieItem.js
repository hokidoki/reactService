import React, { Component } from 'react'
import { Card,Button } from 'semantic-ui-react'

class MyMovieItem extends Component {
    static defaultProps ={
        imageUrl : '',
        name : '',
        opendAt : '',
        description : '',
        likeCnt : '',
        id : null,
        onClick : null,
        }

        onClick = ()=>{
            if(this.props.onClick && this.props.id){
                this.props.onClick(this.props.id);
            }
        }
    render() {
        const {
            imageURL,
            name,
            opendAt,
            description,
            
        } = this.props;
        return (
            <Card fluid>
                <div style={{
                    height:300,
                    backgroundImage : `url(${imageURL})`,
                    backgroundPosition : 'center',
                    backgroundSize : "cover",
                    backgroundRepeat : "no-repeat"
                }}/>

                
                {/* <Image src={imageUrl} wrapped ui={false}/> */}
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{opendAt}</span>
                    </Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                <Card.Content extra>
                <Button onClick={this.onClick}>수정하기</Button>
                <Button onClick={this.onClick}>삭제하기</Button>
                </Card.Content>
                

            </Card>
        )
    }
}

export default MyMovieItem;