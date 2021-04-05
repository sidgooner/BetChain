import React from 'react'
import  {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import './player-card-pitch.styles.scss'

const PlayerCardPitch = (props)=>{
    return(
        <Card className='player-card-pitch' style={{ width: '5.7rem' }}>
            <Card.Img class='photo' variant="top" src={props.imageUrl} />
            <Card.Body className="player-body">
                
                <Card.Text className="player-name-pitch">{props.first_name[0]+"."+props.last_name}</Card.Text>
                <Card.Text className="player-position-pitch">{props.position.slice(0,3)}</Card.Text>
                
            </Card.Body>
        </Card>
    );
}

export default PlayerCardPitch;