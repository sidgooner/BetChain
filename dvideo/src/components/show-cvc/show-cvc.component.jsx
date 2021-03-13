import React from 'react'
import './show-cvc.styles.scss'
import {ToggleButton, ButtonGroup} from 'react-bootstrap';

import {Card, Row, Col, Button}  from 'react-bootstrap'
const ShowCVc = (props)=>{
   // console.log(props)
    return(
        <Card className='cvc-card' style={{ width: '65rem' }}>
        <Row className='no-gutters'>
        <Col md={5} lg={5}  >
        <Card.Img variant="top" className='cvc-photo' src={props.imageUrl} />
        </Col>
        <Col>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.position}</Card.Text>
          <ButtonGroup toggle className="mb-2">
        <ToggleButton
          onClick={() => { props.selectCaptain(props.id)}}
          type="checkbox"
          variant="secondary">C</ToggleButton>
          <ToggleButton
          onClick={() => { props.selectViceCaptain(props.id)}}
          type="checkbox"
          variant="secondary">VC</ToggleButton>
          </ButtonGroup>

        </Card.Body>
        </Col>
        </Row>
      </Card>
        )
}

export default ShowCVc