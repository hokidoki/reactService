import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

class MovieItem extends Component {
    static defaultProps ={
        imageUrl : '',
        name : '',
        opendAt : '',
        description : '',
        likeCnt : ''
        }
    render() {
        const {
            imageURL,
            name,
            opendAt,
            description,
            likeCnt
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
                    <a>
                        <Icon name='like' />
                        {likeCnt}
              </a>
                </Card.Content>
            </Card>
        )
    }
}

export default MovieItem;