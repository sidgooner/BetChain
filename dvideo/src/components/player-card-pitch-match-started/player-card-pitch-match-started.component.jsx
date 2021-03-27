import './player-card-pitch-match-started.styles.scss'
import React from 'react'
import  {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'


const PlayerCardPitchStarted = (props)=>{
    return(
        <Card className='player-card-pitch-started' style={{ width: '5.7rem' }}>
            <Card.Img class='photo' variant="top" src={props.imageUrl} />
            <Card.Body className="player-body-started">
                
                <Card.Text className="player-name-pitch-started">{props.first_name[0]+"."+props.last_name}</Card.Text>
                <Card.Text className="player-position-pitch-started">{props.position}</Card.Text>
                
            </Card.Body>
        </Card>
    );
}

export default PlayerCardPitchStarted;