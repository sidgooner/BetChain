import React from 'react'
import  {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import './player-card.styles.scss'

const PlayerCard = (props)=>{
    return(
        <Card className='player-card' style={{ width: '9rem' }}>
            <Card.Img variant="top" src={props.imageUrl} />
            <Card.Body className='non-pitch'>
                <Card.Text >{props.name}</Card.Text>
                <Button variant="primary" size="sm">i</Button>
            </Card.Body>
        </Card>
    );
}

export default PlayerCard;