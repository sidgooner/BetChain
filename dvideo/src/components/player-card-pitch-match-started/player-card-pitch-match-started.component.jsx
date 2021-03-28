import './player-card-pitch-match-started.styles.scss'
import React from 'react'
import  {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'


class PlayerCardPitchStarted extends React.Component{
    
    constructor(props){
        super(props)


    }

    
    render()
        {return(
        <Card className='player-card-pitch-started' style={{ width: '5.7rem' }}>
            <Card.Img class='photo' variant="top" src={this.props.imageUrl} />
            <Card.Body className="player-body-started">
                
                <Card.Text className="player-name-pitch-started">{this.props.first_name[0]+"."+this.props.last_name}</Card.Text>
                <Card.Text className="player-position-pitch-started">{this.props.position}</Card.Text>
                
            </Card.Body>
        </Card>
    );}
}

export default PlayerCardPitchStarted;