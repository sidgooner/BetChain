import React from 'react'
import  {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import './player-card-pitch.styles.scss'

const PlayerCardPitch = (props)=>{
    return(
        <Card className='player-card-pitch' style={{ width: '5rem' }}>
            <Card.Img class='photo' variant="top" src={props.imageUrl} />
            <Card.Body className="player-body">
                <Card.Text className="player-name-pitch">{props.name}</Card.Text>
                
            </Card.Body>
        </Card>
    );
}

export default PlayerCardPitch;